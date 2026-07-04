'use client'

import Form from 'next/form'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { SubmitButton } from './submit-button'
import { use, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { ExerciseResult } from '@/lib/data/getExercises'
import { addExerciseToWorkout } from '@/lib/actions/add-exercise-to-workout'


export default function AddExerciseToSessionForm({
    onSuccess,
    exercisesPromise,
    workoutId
} : {
    exercisesPromise: Promise<ExerciseResult>,
    onSuccess?: () => void,
    workoutId: string
}) {
    const [state, formAction] = useActionState(
        addExerciseToWorkout,
        null
    )

    const exercises = use(exercisesPromise)

    useEffect(() => {
        if (!state) return

        if (state.success) {
            toast.success('Exercise added successfully!')
            onSuccess?.()
        } else if (state.error) {
            if (typeof state.error === 'string') {
                toast.error(state.error)
            } else {
                toast.error("Please fix the highlighted errors")
            }
        }     
    }, [state])

    return (
        <div>
            <Form 
                action={formAction}
                className=' p-4 flex flex-col space-y-2.5 w-full'
            >
                <div className='flex flex-col space-y-2'>
                    <input type='hidden' name='workoutId' value={workoutId} />

                    <Label htmlFor='exerciseId'>Exercise</Label>
                    <Select name='exerciseId' >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select an Exercise' />
                        </SelectTrigger>
                        <SelectContent>
                            {exercises.map((exercise) => (
                                <SelectItem key={exercise.id} value={exercise.id}>
                                    {exercise.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {typeof state?.error !== "string" && state?.error?.exerciseId && (
                        <p className="text-destructive text-xs">{state.error.exerciseId[0]}</p>
                    )}

                    {typeof state?.error !== "string" && state?.error?.workoutId && (
                        <p className="text-destructive text-xs">{state.error.workoutId[0]}</p>
                    )}
                </div>

                <SubmitButton 
                    actionText='Adding...'
                    text='Add Exercise'
                    // pendingChildren={<Spinner />}
                />
            </Form>
        </div>
    )
}