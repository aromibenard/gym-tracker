import { db } from "@/client";
import { SessionExerciseResult, SessionExerciseWithRelations } from "./getSessionExercises";
import { Prisma } from "../../app/generated/prisma"



type PreviousSessionExercise = Prisma.SessionExerciseGetPayload<{
    include: {
        sets: {
            orderBy: {
                order: "asc";
            };
        };
        session: true;
    };
}>;

export type SessionExerciseWithPrevious = SessionExerciseResult[number] & {
    previousSets: PreviousSessionExercise["sets"];
};

export default async function getPreviousSessionExercises(
    sessionId: string,
    sessionExercises: SessionExerciseResult
): Promise<SessionExerciseWithPrevious[]> {
    if (!sessionId || sessionExercises.length === 0) {
        return [];
    }

    try {
        const sessionExerciseIds = sessionExercises.map(
            (exercise) => exercise.exerciseId
        );

        const previousSessionExercises =
            await db.sessionExercise.findMany({
                where: {
                    exerciseId: {
                        in: sessionExerciseIds,
                    },
                    sessionId: {
                        not: sessionId,
                    },
                },
                include: {
                    sets: {
                        orderBy: {
                            order: "asc",
                        },
                    },
                    session: true,
                },
                orderBy: {
                    session: {
                        perfomedAt: "desc",
                    },
                },
            });

        const previousSessionExercisesMap = new Map<
            string,
            PreviousSessionExercise
        >();

        for (const item of previousSessionExercises) {
            // Because results are ordered by performedAt desc,
            // the first occurrence is the most recent previous session.
            if (!previousSessionExercisesMap.has(item.exerciseId)) {
                previousSessionExercisesMap.set(item.exerciseId, item);
            }
        }

        return sessionExercises.map((sessionExercise) => ({
            ...sessionExercise,
            previousSets:
                previousSessionExercisesMap.get(
                    sessionExercise.exerciseId
                )?.sets ?? [],
        }));
    } catch (error) {
        console.error(
            "Error fetching previous session exercises:",
            error
        );
        return [];
    }
}

export type GetPreviousSessionExercisesResult = Awaited<
    ReturnType<typeof getPreviousSessionExercises>
>;