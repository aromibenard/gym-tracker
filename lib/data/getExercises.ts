import { db } from "@/client";
import { currentUser } from "@clerk/nextjs/server";

export default async function getExercises() {
    try {
        const user = await currentUser()

        if (!user) {
            console.error("Unauthorized access to exercises")
            return []
        }

        const exercises = await db.exercise.findMany({
            where: {
                userId: user.id
            } 
        })
        return exercises ?? []
    } catch (error) {
        console.error("Error fetching exercises:", error)
        return []
    }
}


export type ExerciseResult = Awaited<ReturnType<typeof getExercises>>
export type ExerciseWithRelations = ExerciseResult[number]