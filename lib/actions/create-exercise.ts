'use server'

import { db } from '@/client'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import z from 'zod'

const schema  = z.object({
    name: z.string().min(1, "Exercise name is required"),
    muscleGroup: z.string().min(1, "Muscle group is required")
})

export async function createExercise(prevState: unknown ,formData: FormData) {
    const parsedData = schema.safeParse({
        name: formData.get('name'),
        muscleGroup: formData.get('muscleGroup')
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

    const { name, muscleGroup } = parsedData.data

    try {
        const user = await currentUser()

        if (!user) {
            return {
                success: false,
                error: 'Unauthorized'
            }
        }

        await db.exercise.create({
            data: {
                userId: user.id,
                name,
                muscleGroupId: muscleGroup
            }
        })

        revalidatePath('/')

        return {
            success: true
        }
        
        
    } catch (error) {
        console.error("Error creating exercise:", error)
        return {
            success: false,
            error: 'Something went wrong'
        }
        
    }
}