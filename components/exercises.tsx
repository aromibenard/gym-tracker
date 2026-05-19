import getExercises from "@/lib/data/getExercises";

export default async function Exercises() {
    const exercises = await getExercises()

    return (
        <div className="w-full">
            {exercises.length === 0 ? (
                <p className="text-gray-600">No exercises found. Start by creating a new exercise!</p>
            ) : (
                <div className="space-y-2 w-full">
                    {exercises.map((exercise) => (
                        <div key={exercise.id} className="border-b border-gray-200 py-2">
                            <h3 className="font-medium">{exercise.name}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}