'use client'

import Form from 'next/form'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { SubmitButton } from './submit-button'
import { Spinner } from './spinner'
import { use, useActionState, useEffect } from 'react'
import { createExercise } from '@/lib/actions/create-exercise'
import { MuscleGroupWithRelations } from '@/lib/data/getMuscleGroups'
import { toast } from 'sonner'


export default function CreateExerciseForm({
    muscleGroupsPromise
} : {
    muscleGroupsPromise: Promise<MuscleGroupWithRelations[]>
}) {
    const [state, formAction] = useActionState(
        createExercise,
        null
    )

    const MuscleGroups = use(muscleGroupsPromise)

    useEffect(() => {
        if (!state) return

        if (state.success) {
            toast.success('Exercise created successfully!')
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
                className='border-2 dark:border-gray-600 p-4 flex flex-col space-y-2.5 gap-2 rounded-md w-full max-w-md'
            >
                <div className='flex flex-col space-y-2.5'>
                    <Label htmlFor='name'>Exercise Name</Label>
                    <Input id='name' name='name' placeholder='e.g. Bench Press' />
                    
                    {typeof state?.error !== "string" && state?.error?.name && (
                        <p className="text-destructive text-xs">{state.error.name[0]}</p>
                    )}
                </div>

                <div className='flex flex-col space-y-2'>
                    <Label htmlFor='muscleGroup'>Muscle Group</Label>
                    <Select name='muscleGroup' >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select a muscle group' />
                        </SelectTrigger>
                        <SelectContent>
                            {MuscleGroups.map((group) => (
                                <SelectItem key={group.id} value={group.id}>
                                    {group.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {typeof state?.error !== "string" && state?.error?.muscleGroup && (
                        <p className="text-destructive text-xs">{state.error.muscleGroup[0]}</p>
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