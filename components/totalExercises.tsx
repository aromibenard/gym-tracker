import getExercises from "@/lib/data/getExercises"


export default async function TotalExercises() {
    const exercises = await getExercises()

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <h1 className="font-semibold text-3xl">{exercises.length}</h1>
            <p className="text-muted-foreground">Total Exercises</p>
        </div>
    )
}