'use client'

import Form from 'next/form'
import { SubmitButton } from './submit-button'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { Set } from '@/app/generated/prisma'
import { deleteSet } from '@/lib/actions/deleteSet'


export default function DeleteSetForm({
    onSuccess,
    setData,
    workoutId
} : {
    onSuccess?: () => void,
    setData: Set,
    workoutId: string
}) {
    const [state, formAction] = useActionState(
        deleteSet,
        null
    )

    useEffect(() => {
        if (!state) return

        if (state.success) {
            toast.success('Set deleted')
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
        <div className='flex flex-col space-y-2.5 w-full'>
            <div className="flex flex-col items-center text-center space-y-1 py-2">
                <h1 className="text-lg font-semibold">
                    Delete Set?
                </h1>
                <p className="text-sm text-muted-foreground">
                    This action cannot be undone.
                </p>
            </div>
            <Form 
                action={formAction}
                className=' p-4 flex flex-col space-y-2.5 w-full'
            >
                <div className='flex flex-col space-y-2'>
                    <input type='hidden' name='workoutId' value={workoutId} />
                    <input type='hidden' name='setId' value={setData.id} />

                    {typeof state?.error !== "string" && state?.error?.setId && (
                        <p className="text-destructive text-xs">{state.error.setId[0]}</p>
                    )}

                    {typeof state?.error !== "string" && state?.error?.workoutId && (
                        <p className="text-destructive text-xs">{state.error.workoutId[0]}</p>
                    )}

                </div>

                <SubmitButton 
                    actionText='Deleting...'
                    text='Delete Set'
                    // pendingChildren={<Spinner />}
                />
            </Form>
        </div>
    )
}