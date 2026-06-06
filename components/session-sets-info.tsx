import { SessionExerciseResult } from "@/lib/data/getSessionExercises";
import { use } from "react";


export default function SessionSetsInfo({
    sessionExercisesPromise
} : {
    sessionExercisesPromise: Promise<SessionExerciseResult | []>
}) {
    const sessionExercises  = use(sessionExercisesPromise)

    return (
        <div className="flex items-center space-x-2">
            <h1 className=" font-medium">Sets</h1>
            <h1 className=" font-medium">
                {sessionExercises.reduce((total, exercise) => total + exercise.sets.length, 0)}
            </h1>
        </div>
    )
}