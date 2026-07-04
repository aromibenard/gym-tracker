'use server'

import { db } from '@/client'
import { revalidatePath } from 'next/cache'
import z from 'zod'

const schema  = z.object({
    sessionExerciseId: z.string().min(1, "Missing Workout Exercise"),
    workoutId: z.string().min(1, "Missing Workout"),
    order: z.coerce.number().min(1, "Missing Order").max(6, "Order must be between 1 and 6"),
    weight: z.coerce.number().min(1, "Missing Weight"),
    reps: z.coerce.number().min(1, "Missing Reps")
})

export async function addSet(prevState: unknown ,formData: FormData) {
    const parsedData = schema.safeParse({
        sessionExerciseId: formData.get('sessionExerciseId'),
        order: formData.get('order'),
        weight: formData.get('weight'),
        reps: formData.get('reps'),
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

    const { 
        order,
        weight,
        reps,
        sessionExerciseId,
        workoutId
    } = parsedData.data

    try {
        await db.set.create({
            data: {
                order,
                weight,
                reps,
                sessionExerciseId,
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