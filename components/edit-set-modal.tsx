'use client'

import { ResponsiveModal } from "@/components/responsive-modal";
import { Suspense, useState } from "react";
import { Spinner } from "./spinner";
import { Set } from "@/app/generated/prisma";
import EditSetForm from "./edit-set-form";
import { Pencil } from "lucide-react";

export function EditSetModal({
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
            trigger={<Pencil className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />}
        >
            <Suspense fallback={<Spinner />}>
                <EditSetForm
                    onSuccess={() => setOpen(false)}
                    setData={setData}
                    workoutId={workoutId}
                />
            </Suspense>
        </ResponsiveModal>
    );
}