'use server'

import { SessionStatus } from '@/app/generated/prisma'
import { db } from '@/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import z, { success } from 'zod'

const schema  = z.object({
    workoutId: z.string().min(1, "Missing Workout"),
})

export async function finishWorkout(prevState: unknown ,formData: FormData) {
    const parsedData = schema.safeParse({
        workoutId: formData.get('workoutId')
    })
    
    if (!parsedData.success) {
        return {
            success: false,
            error: parsedData.error.flatten().fieldErrors,
            values: Object.fromEntries(
                Array.from(formData.entries()).map(([key, value]) => [
                    key,
                    typeof value === 'string' ? value : ''
                ])
            )
        }
    }

    const { workoutId } = parsedData.data

    try {
        const session = await db.session.findUnique({
            where: { id: workoutId },
            include: {
                exercises: {
                    orderBy: {
                        order: 'asc'
                    },
                    include: {
                        sets: {
                            orderBy: {
                                order: 'asc'
                            }
                        },
                        exercise: true
                    }
                }
            }
        })

        if(session?.status === SessionStatus.COMPLETED) {
            return {
                success: false,
                error: 'This workout has already been completed'
            }
        }

        if(!session || session.exercises.length === 0) {
            return {
                success: false,
                error: 'No exercises found for this workout'
            }
        }

        const emptyExercise = session.exercises.find(
            exercise => exercise.sets.length === 0
        )

        if (emptyExercise) {
            return {
                success: false,
                error: `${emptyExercise.exercise.name} has no sets.`
            }
        }

        await db.$transaction(async (tx) => {
            for (const exercise of session.exercises) {
                const maxWeight = Math.max(
                    ...exercise.sets.map(set => set.weight)
                )

                const maxReps = Math.max(
                    ...exercise.sets.map(set => set.reps)
                )

                const existingRecord = await tx.personalRecord.findUnique({
                    where: {
                        userId_exerciseId: {
                            userId: session.userId,
                            exerciseId: exercise.exerciseId
                        }
                    }
                })

                if (!existingRecord) {
                    await tx.personalRecord.create({
                        data: {
                            userId: session.userId,
                            exerciseId: exercise.exerciseId,
                            maxWeight,
                            maxReps
                        }
                    })

                    continue
                }

                await tx.personalRecord.update({
                    where: {
                        userId_exerciseId: {
                            userId: session.userId,
                            exerciseId: exercise.exerciseId
                        }
                    },
                    data: {
                        maxWeight: Math.max(
                            existingRecord.maxWeight,
                            maxWeight
                        ),
                        maxReps: Math.max(
                            existingRecord.maxReps,
                            maxReps
                        )
                    }
                })
            }

            await tx.session.update({
                where: {
                    id: workoutId
                },
                data: {
                    status: SessionStatus.COMPLETED,
                    completedAt: new Date()
                }
            })
        })

        revalidatePath(`/workout/${workoutId}`)
        revalidatePath('/')

        return {
            success: true
        }
        
    } catch (error) {
        console.error("Error editing set:", error)
        return {
            success: false,
            error: 'Something went wrong'
        }
        
    }
}