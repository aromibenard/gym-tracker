'use client'

import { ResponsiveModal } from "@/components/responsive-modal";
import { Suspense, useState } from "react";
import { Spinner } from "./spinner";
import AddSetForm from "./add-set-form";

export function AddSetModal({
    sessionExerciseId,
    workoutId
}: {
    sessionExerciseId: string;
    workoutId: string;
}) {
    const [open, setOpen] = useState(false);

    return (
        <ResponsiveModal
            open={open}
            onOpenChange={setOpen}
            trigger={<p className="">Add Set</p>}
        >
            <Suspense fallback={<Spinner />}>
                <AddSetForm 
                    sessionExerciseId={sessionExerciseId}
                    workoutId={workoutId}
                    onSuccess={() => setOpen(false)}
                />
            </Suspense>
        </ResponsiveModal>
    );
}