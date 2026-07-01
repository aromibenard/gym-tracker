import { db } from "@/client";

export default async function getSessionExercises(sessionId: string) {
    if (!sessionId) return [];

    try {
        const sessionExercises = await db.sessionExercise.findMany({
            where: { sessionId },
            include: {
                exercise: true,
                sets: {
                    orderBy: {
                        order: "asc"
                    }
                },
            },
        });

        return sessionExercises;
    } catch (error) {
        console.error("Error fetching session exercises:", error);
        return [];
    }
}


export type SessionExerciseResult = Awaited<ReturnType<typeof getSessionExercises>>
export type SessionExerciseWithRelations = SessionExerciseResult[number]
