import { db } from "@/client";
import WorkoutHeader from "@/components/workout-header";
import getSessionExercises from "@/lib/data/getSessionExercises";
import { getWorkout } from "@/lib/data/getWorkout";

type Props = {
    params: Promise<{ id: string }>
}


export default  async function Page({ params }: Props) {
    const { id } = await params;

    const workout = await getWorkout(id)
    const sessionExercisesPromise = getSessionExercises(id)

    if (!workout) {
        return (
            <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-black w-full md:max-w-4xl mx-auto p-8">
                <h1>Workout not found</h1>
            </div>
        )
    }

    const session = await db.session.findUnique({
        where: { id },   
    })    

    return (
        <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-black w-full md:max-w-4xl mx-auto p-8">
            <WorkoutHeader  
                workout={workout} 
                sessionExercisesPromise={sessionExercisesPromise}
            />
        </div>
    )
}
