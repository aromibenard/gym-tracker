import getMuscleGroups from "@/lib/data/getMuscleGroups";
import CreateExerciseForm from "./create-exercise-form";
import { Suspense } from "react";
import { Spinner } from "./spinner";

export default function FormParent() {
    const muscleGroupsPromise = getMuscleGroups()

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Create Exercise</h1>
            <p className="mb-6 text-gray-600">Fill out the form below to add a new exercise to your routine.</p>
            
            <Suspense 
                fallback={<div className="flex items-center justify-center h-32">
                    <Spinner />
                </div>
            }>
                <CreateExerciseForm 
                    muscleGroupsPromise={muscleGroupsPromise} 
                />
            </Suspense>
        </div>
    )
}