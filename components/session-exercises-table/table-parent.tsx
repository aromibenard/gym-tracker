import getSessionExercises from "@/lib/data/getSessionExercises";
import { DataTable } from "../table";
import { columns } from "./columns";

export default async function TableParent({
    sessionId,
}: {
    sessionId: string;
}) {
    const sessionExercises = await getSessionExercises(sessionId);
    return (
        <>
            <DataTable 
                columns={columns}
                data={sessionExercises}
            />
        </>
    )
}