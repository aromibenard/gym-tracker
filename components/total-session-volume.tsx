import { use } from "react";
import { SessionExerciseResult } from "@/lib/data/getSessionExercises";

export default function TotalSessionVolume({
    sessionExercisesPromise,
}: {
    sessionExercisesPromise: Promise<SessionExerciseResult>;
}) {
    const sessionExercises = use(sessionExercisesPromise);

    const totalVolume = sessionExercises.reduce(
        (exerciseTotal, exercise) =>
            exerciseTotal +
            exercise.sets.reduce(
                (setTotal, set) => setTotal + set.reps * set.weight,
                0
            ),
        0
    );

    return (
        <div className="flex items-center space-x-2">
            <h1 className=" font-medium">Volume</h1>
            <h1 className=" font-medium">
                {totalVolume.toLocaleString()} Kg
            </h1>
        </div>
    );
}