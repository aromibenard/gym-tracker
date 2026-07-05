'use client'

import Form from 'next/form'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { SubmitButton } from './submit-button'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { Input } from './ui/input'
import { addSet } from '@/lib/actions/add-set'

const setOrderOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
]

export default function AddSetForm({
    onSuccess,
    sessionExerciseId,
    workoutId
} : {
    onSuccess?: () => void,
    sessionExerciseId: string,
    workoutId: string
}) {
    const [state, formAction] = useActionState(
        addSet,
        null
    )

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
    }, [state, onSuccess])

    return (
        <div>
            <Form 
                action={formAction}
                className=' p-4 flex flex-col space-y-2.5 w-full'
            >
                <div className='flex flex-col space-y-2'>
                    <input type='hidden' name='sessionExerciseId' value={sessionExerciseId} />
                    <input type='hidden' name='workoutId' value={workoutId} />

                    <Label htmlFor='order'>Set Order</Label>
                    <Select name='order' >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Choose set number' />
                        </SelectTrigger>
                        <SelectContent>
                            {setOrderOptions.map((order) => (
                                <SelectItem key={order.label} value={order.value}>
                                    {order.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {typeof state?.error !== "string" && state?.error?.order && (
                        <p className="text-destructive text-xs">{state.error.order[0]}</p>
                    )}

                    {typeof state?.error !== "string" && state?.error?.workoutId && (
                        <p className="text-destructive text-xs">{state.error.workoutId[0]}</p>
                    )}

                    {typeof state?.error !== "string" && state?.error?.sessionExerciseId && (
                        <p className="text-destructive text-xs">{state.error.sessionExerciseId[0]}</p>
                    )}
                </div>

                <div className='flex flex-col space-y-2'>
                    <Label htmlFor='weight'>Weight (Kg)</Label>
                    <Input 
                        name='weight'
                        id='weight'
                        type='number'
                    />

                    {typeof state?.error !== "string" && state?.error?.weight && (
                        <p className="text-destructive text-xs">{state.error.weight[0]}</p>
                    )}
                </div>

                <div className='flex flex-col space-y-2'>
                    <Label htmlFor='weight'>Reps</Label>
                    <Input 
                        name='reps'
                        id='reps'
                        type='number'
                    />

                    {typeof state?.error !== "string" && state?.error?.reps && (
                        <p className="text-destructive text-xs">{state.error.reps[0]}</p>
                    )}
                </div>

                <SubmitButton 
                    actionText='Adding...'
                    text='Add Set'
                    // pendingChildren={<Spinner />}
                />
            </Form>
        </div>
    )
}