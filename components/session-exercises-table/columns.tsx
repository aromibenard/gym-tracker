'use client'

import { ColumnDef } from "@tanstack/react-table";
import { SessionExerciseWithRelations } from "@/lib/data/getSessionExercises";
import { ActionCell } from "../action-cell";
import { EditSetModal } from "../edit-set-modal";
import { DeleteSetModal } from "../delete-set-modal";

// const statusLabels: Record<ToolStatus, string> = {
//   AVAILABLE: "Available",
//   CHECKED_OUT: "Checked out",
//   IN_TRANSIT: "In transit",
//   UNDER_REPAIR: "Under repair",
//   LOST: "Lost",
//   RETIRED: "Retired",
// };

// const conditionLabels: Record<ToolCondition, string> = {
//     NEW: "New",
//     GOOD: "Good",
//     FAIR: "Fair",
//     DAMAGED: "Damaged",
//     UNUSABLE: "Unusable"
// }

// export const conditionStyles: Record<ToolCondition, string> = {
//   NEW: "bg-primary text-primary-foreground",
//   GOOD: "bg-accent text-accent-foreground",
//   FAIR: "bg-secondary text-secondary-foreground",
//   DAMAGED: "bg-destructive text-destructive-foreground",
//   UNUSABLE: "bg-muted text-muted-foreground",
// } as const;

// export const statusStyles: Record<ToolStatus, string> = {
//   AVAILABLE: "bg-primary text-primary-foreground",
//   CHECKED_OUT: "bg-accent text-accent-foreground",
//   IN_TRANSIT: "bg-secondary text-secondary-foreground",
//   UNDER_REPAIR: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
//   LOST: "bg-destructive text-destructive-foreground",
//   RETIRED: "bg-muted text-muted-foreground",
// } as const;

export const columns: ColumnDef<SessionExerciseWithRelations>[] = [
    {
        accessorFn: row => row.exercise.name,
        id: "name",
        header: "Name"
    },
    // {
    //     accessorKey: 'currentStatus',
    //     header: 'Status',
    //     cell: ({ row }) => {
    //         const status = row.original.currentStatus

    //         return (
    //             <Badge
    //                 className={cn(statusStyles[status])}
    //             >
    //                 {statusLabels[status]}
    //             </Badge>
    //         )
    //     }
    // },
    {
        id: "sets",
        header: "Sets",
        cell: ({ row }) => (
            <div className="space-y-0.5">
                {row.original.sets.map((set) => (

                    <div
                        key={set.id}
                        className="grid grid-cols-4 text-sm gap-0.5"
                    >
                        <span>Set {set.order}</span>
                        <span>{set.weight} kg</span>
                        <span>{set.reps} reps</span>
                        <div className="flex space-x-1">
                            <EditSetModal 
                                setData={set}
                                workoutId={row.original.sessionId}
                            />

                            <DeleteSetModal 
                                setData={set}
                                workoutId={row.original.sessionId}
                            />

                        </div>
                    </div>
                ))}
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row}) => <ActionCell data={row.original} />
    }
]