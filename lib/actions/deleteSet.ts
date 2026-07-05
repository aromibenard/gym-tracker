'use server'

import { db } from '@/client'
import { revalidatePath } from 'next/cache'
import z from 'zod'

const schema  = z.object({
    setId: z.string().min(1, "Missing Set"),
    workoutId: z.string().min(1, "Missing Workout"),
})

export async function deleteSet(prevState: unknown ,formData: FormData) {
    const parsedData = schema.safeParse({
        setId: formData.get('setId'),
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
        setId,
        workoutId
    } = parsedData.data

    try {
        await db.set.delete({
            where: { id: setId },
        })

        revalidatePath(`/workouts/${workoutId}`)

        return {
            success: true
        }
        
    } catch (error) {
        console.error("Error deleting set:", error)
        return {
            success: false,
            error: 'Something went wrong'
        }
        
    }
}