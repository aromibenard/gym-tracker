'use client'

import { ResponsiveModal } from "@/components/responsive-modal";
import { Card } from "@/components/card";
import AddExerciseToSessionForm from "@/components/add-exercise-to-session-form";
import { Suspense, useState } from "react";
import { ExerciseResult } from "@/lib/data/getExercises";
import { Spinner } from "./spinner";

export function AddExerciseModal({
    workoutId,
    exercisesPromise,
}: {
    workoutId: string;
    exercisesPromise: Promise<ExerciseResult>;
}) {
    const [open, setOpen] = useState(false);

    return (
        <ResponsiveModal
            open={open}
            onOpenChange={setOpen}
            trigger={<Card>Add Exercise</Card>}
        >
            <Suspense fallback={<Spinner />}>
                <AddExerciseToSessionForm
                    workoutId={workoutId}
                    exercisesPromise={exercisesPromise}
                    onSuccess={() => setOpen(false)}
                />
            </Suspense>
        </ResponsiveModal>
    );
}