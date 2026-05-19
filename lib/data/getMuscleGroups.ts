import { db } from "@/client";


export default async function getMuscleGroups() {
    try {
        const muscleGroups = await db.muscleGroup.findMany({
        })
        return muscleGroups ?? []
    } catch (error) {
        console.error("Error fetching muscle groups:", error)
        return []
    }
}


export type MuscleGroupResult = Awaited<ReturnType<typeof getMuscleGroups>>
export type MuscleGroupWithRelations = MuscleGroupResult[number]