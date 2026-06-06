import { WorkoutResult } from "@/lib/data/getWorkout";
import { Card } from "./card";
import ElapsedTimeCard from "./elapsed-time-card";
import { SessionExerciseResult } from "@/lib/data/getSessionExercises";
import SessionExercisesInfo from "./session-exercises-info";
import { Suspense } from "react";
import SessionSetsInfo from "./session-sets-info";
import TotalSessionVolume from "./total-session-volume";


export default function WorkoutHeader({
    workout,
    sessionExercisesPromise,
} : {
    workout: WorkoutResult
    sessionExercisesPromise: Promise<SessionExerciseResult | []>
    
}) {
    if (!workout) {
        return (
            <div className="p-5 bg-red-100 text-red-800 rounded-lg">
                Workout data is missing.
            </div>
        )
    }

    return (
        <Card>
            <ElapsedTimeCard 
                startTime={workout.createdAt.toISOString()} 
                title={"Workout Session"} 
            />

            <div className="flex items-center justify-between w-full ">
                <Suspense fallback={<div className="text-sm text-zinc-500">Loading...</div>}>
                    <SessionExercisesInfo 
                        sessionExercisesPromise={sessionExercisesPromise}
                    />
                </Suspense>

                <Suspense fallback={<div className="text-sm text-zinc-500">Loading...</div>}>
                    <SessionSetsInfo 
                        sessionExercisesPromise={sessionExercisesPromise} 
                    />
                </Suspense>

                <Suspense fallback={<div className="text-sm text-zinc-500">Loading...</div>}>
                    <TotalSessionVolume 
                        sessionExercisesPromise={sessionExercisesPromise} 
                    />
                </Suspense>
            </div>
        </Card>
    )
}