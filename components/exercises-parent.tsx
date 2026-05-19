import { Suspense } from "react";
import { Spinner } from "./spinner";
import Exercises from "./exercises";

export default async function ExercisesParent() {
    return (
        <div className="border-2 border-green-400">
            <h1 className="text-xl font-bold">Exercises</h1>
            <p className="mb-4 text-gray-600">Manage your exercises and track your progress.</p>

            <Suspense
                fallback={<div className="flex items-center justify-center h-32">
                    <Spinner />
                </div>} 
            >
                <Exercises />
            </Suspense>
        </div>
    )
}