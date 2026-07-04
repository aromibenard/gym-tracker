'use server'

import { db } from '@/client'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import z from 'zod'

const schema  = z.object({
    workoutId: z.string().min(1, "Missing Workout"),
    exerciseId: z.string().min(1, "Missing Exercise")
})

export async function addExerciseToWorkout(prevState: unknown ,formData: FormData) {
    const parsedData = schema.safeParse({
        workoutId: formData.get('workoutId'),
        exerciseId: formData.get('exerciseId')
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

    const { exerciseId, workoutId } = parsedData.data

    try {
        const user = await currentUser()

        if (!user) {
            return {
                success: false,
                error: 'Unauthorized'
            }
        }

        await db.sessionExercise.create({
            data: {
                order: 0,
                sessionId: workoutId,
                exerciseId
            }
        })

        revalidatePath(`/workouts/${workoutId}`)

        return {
            success: true
        }
        
    } catch (error) {
        console.error("Error adding exercise:", error)
        return {
            success: false,
            error: 'Something went wrong'
        }
        
    }
}