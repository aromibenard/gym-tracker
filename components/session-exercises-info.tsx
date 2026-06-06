import { SessionExerciseResult } from "@/lib/data/getSessionExercises"
import { Suspense, use } from "react"
import { Spinner } from "./spinner"


export default function SessionExercisesInfo({
    sessionExercisesPromise
} : {
    sessionExercisesPromise: Promise<SessionExerciseResult | []>
}) {
    const sessionExercises  = use(sessionExercisesPromise)

    return (
        <div className="flex items-center space-x-2">
            <h1 className=" font-medium pl-5">Exercises</h1>
            <Suspense fallback={<Spinner />}>
                <h1 className=" font-medium">{sessionExercises.length}</h1>
            </Suspense>
        </div>
    )
}