import { db } from "@/client";

export async function getWorkout(sessionId: string) {
  return db.session.findUnique({
    where: { id: sessionId },
    include: {
      exercises: {
        include: {
          exercise: true,
          sets: {
            orderBy: { order: "asc" },
          },
        },
        orderBy: {
          order: "asc",
        },
      },
    },
  });
}

export type WorkoutResult = Awaited<ReturnType<typeof getWorkout>>
export type WorkoutWithRelations = WorkoutResult extends infer R
  ? R extends { exercises: infer E }
    ? Omit<R, "exercises"> & { exercises: E extends Array<infer I> ? I : never }
    : R
  : never;