import { Suspense } from "react";
import { Spinner } from "./spinner";
import { Card } from "./card";
import TotalExercises from "./totalExercises";

export default async function ExercisesParent() {
    return (
        <div>
            <Card href="/exercises">
                <h1 className="text-xl font-bold">Exercises</h1>
                <p className="mb-4 text-gray-600">Manage your exercises and track your progress.</p>

                <div className="grid grid-cols-2">
                    <div className="border-2 p-2 items-center justify-center">
                      <Suspense 
                        fallback={<div className="flex items-center justify-center h-8 ">
                            <Spinner />
                        </div>}
                      >
                        <TotalExercises />
                      </Suspense>  
                    </div>
                    <div className="border-2 p-2">

                    </div>
                    <div className="border-2 p-2">

                    </div>
                    <div className="border-2 p-2">

                    </div>
                </div>
            </Card>
        </div>
    )
}