import ExerciseScroller from "@/components/exercise-scroller";
import Exercises from "@/components/exercises";
import getExercises from "@/lib/data/getExercises";


export default async function Page() {
    const exercises = await getExercises()

    return (
        <div className="p-8 flex-1 flex-col bg-zinc-50 dark:bg-black w-full md:max-w-4xl mx-auto">
            <ExerciseScroller exercises={exercises} />   
        </div>
    )
}