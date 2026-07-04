import { AddExerciseModal } from "@/components/add-exercise-modal";
import AddExerciseToSessionForm from "@/components/add-exercise-to-session-form";
import { Card } from "@/components/card";
import { ResponsiveModal } from "@/components/responsive-modal";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import WorkoutHeader from "@/components/workout-header";
import getExercises from "@/lib/data/getExercises";
import getSessionExercises from "@/lib/data/getSessionExercises";
import { getWorkout } from "@/lib/data/getWorkout";
import { Suspense } from "react";

type Props = {
    params: Promise<{ id: string }>
}


export default  async function Page({ params }: Props) {
    const { id } = await params;

    const workout = await getWorkout(id)
    const sessionExercisesPromise = getSessionExercises(id)
    const exerciesPromise = getExercises()

    if (!workout) {
        return (
            <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-black w-full md:max-w-4xl mx-auto p-8">
                <h1>Workout not found</h1>
            </div>
        )
    }
    

    return (
        <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-black w-full md:max-w-4xl mx-auto p-8 space-y-6">
            <WorkoutHeader  
                workout={workout} 
                sessionExercisesPromise={sessionExercisesPromise}
            />

            <AddExerciseModal 
                exercisesPromise={exerciesPromise}
                workoutId={workout.id}
            />

            <div>
                <Table>
                    <TableCaption>Exercises for this session.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Exercise</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workout.exercises.map((exercise) => (
                            <TableRow key={exercise.id}>
                                <TableCell>{exercise.exercise.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
