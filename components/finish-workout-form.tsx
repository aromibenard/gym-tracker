'use client'

import Form from 'next/form'
import { SubmitButton } from './submit-button'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { finishWorkout } from '@/lib/actions/finish-workout'
import { useRouter } from 'next/navigation'


export default function FinishWorkoutForm({
    onSuccess,
    workoutId,
} : {
    onSuccess?: () => void,
    workoutId: string
}) {
    const [state, formAction] = useActionState(
        finishWorkout,
        null
    )

    const router = useRouter()

    useEffect(() => {
        if (!state) return

        if (state.success) {
            toast.success('Session recorded successfully!')
            onSuccess?.()

            setTimeout(() => {
                router.push('/')
                router.refresh()
            }, 1000)
        } else if (state.error) {
            if (typeof state.error === 'string') {
                toast.error(state.error)
            } else {
                toast.error("Please fix the highlighted errors")
            }
        }     
    }, [state, onSuccess, router])

    return (
        <div>
            <Form 
                action={formAction}
                className=' p-4 flex flex-col space-y-2.5 w-full'
            >
                <div className='flex flex-col space-y-2'>
                    <input type='hidden' name='workoutId' value={workoutId} />

                    {typeof state?.error !== "string" && state?.error?.workoutId && (
                        <p className="text-destructive text-xs">{state.error.workoutId[0]}</p>
                    )}

                </div>

                <SubmitButton 
                    actionText='Updating...'
                    text='Finish Workout'
                    // pendingChildren={<Spinner />}
                />
            </Form>
        </div>
    )
}