'use client'

import Form from 'next/form'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { MuscleGroups } from '@/lib/utils'
import { SubmitButton } from './submit-button'
import { Spinner } from './spinner'
import { useActionState } from 'react'
import { createExercise } from '@/lib/actions/create-exercise'


export default function CreateExerciseForm() {
    const [state, formAction] = useActionState(
        createExercise,
        null
    )

    return (
        <div>
            <Form 
                action={formAction}
                className='border-2 dark:border-gray-600 p-4 flex flex-col space-y-2.5 gap-2 rounded-md w-full max-w-md'
            >
                <div className='flex flex-col space-y-2.5'>
                    <Label htmlFor='name'>Exercise Name</Label>
                    <Input id='name' name='name' placeholder='e.g. Bench Press' />
                </div>

                <div className='flex flex-col space-y-2'>
                    <Label htmlFor='muscleGroup'>Muscle Group</Label>
                    <Select name='muscleGroup' >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select a muscle group' />
                        </SelectTrigger>
                        <SelectContent>
                            {MuscleGroups.map((group) => (
                                <SelectItem key={group.value} value={group.value}>
                                    {group.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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