import { MoreHorizontal } from "lucide-react";
import AddSetForm from "./add-set-form";
import { ResponsiveModal } from "./responsive-modal";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useState } from "react";
import { SessionExerciseWithRelations } from "@/lib/data/getSessionExercises";

export function ActionCell({ data }: { data: SessionExerciseWithRelations }) {
    const [open, setOpen] = useState(false);

    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost">
                <MoreHorizontal />
            </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
            <DropdownMenuItem
                onSelect={(e) => {
                e.preventDefault();
                setOpen(true);
                }}
            >
                Add Set
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <ResponsiveModal
            open={open}
            onOpenChange={setOpen}
        >
            <AddSetForm
            sessionExerciseId={data.id}
            workoutId={data.sessionId}
            />
        </ResponsiveModal>
        </>
    );
}