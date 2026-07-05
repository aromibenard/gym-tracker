'use client'

import { ResponsiveModal } from "@/components/responsive-modal";
import { Suspense, useState } from "react";
import { Spinner } from "./spinner";
import { Set } from "@/app/generated/prisma";
import { Trash2 } from "lucide-react";
import DeleteSetForm from "./delete-set-form";

export function DeleteSetModal({
    setData,
    workoutId
}: {
    setData: Set,
    workoutId: string
}) {
    const [open, setOpen] = useState(false);

    return (
        <ResponsiveModal
            open={open}
            onOpenChange={setOpen}
            trigger={<Trash2 size={20} className="h-4 w-4 text-destructive cursor-pointer" />}
        >
            <Suspense fallback={<Spinner />}>
                <DeleteSetForm 
                    onSuccess={() => setOpen(false)}
                    setData={setData}
                    workoutId={workoutId}
                />
            </Suspense>
        </ResponsiveModal>
    );
}