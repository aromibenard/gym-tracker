'use client'

import { useFormStatus } from "react-dom"

export function SubmitButton({ 
    text, 
    actionText , 
    className, 
    disabled,
    variant, 
    children,
    pendingChildren,
    showText = true
}: { 
    text?: string, 
    actionText?: string, 
    className?: string, 
    disabled?: boolean,
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined, 
    children?: React.ReactNode,
    pendingChildren?: React.ReactNode,
    showText?: boolean 
}) {
    const { pending } = useFormStatus()

    const hasChildren = !!children
    const hasPendingChildren = !!pendingChildren

    const content = pending
        ? (
            <>
                {showText && (actionText || "Submitting...")}
                {hasPendingChildren ? pendingChildren : hasChildren ? children : null}
            </>
        )
        : (
            <>
                {showText && (text || "Submit")}
                {hasChildren && children}
            </>
        )

    return (
        <button 
            type="submit" 
            className={`${className || 'relative group rounded-2xl transition-all duration-150 active:translate-y-[6px] disabled:cursor-not-allowed'}`} 
            disabled={pending || disabled}
        >
            <div
                className={`
                absolute inset-0
                translate-y-[6px]
                rounded-lg
                bg-zinc-900 dark:bg-zinc-700
                `}
            />

            <div
              className={`
                relative z-10
                px-6 py-2
                rounded-lg
                font-semibold
                text-white
                bg-indigo-600
                border border-indigo-400/30
                transition-all duration-150
                
                group-hover:-translate-y-[1px]
                group-active:translate-y-[6px]

                ${pending ? "opacity-80" : ""}
            `}  
            >
                {content}
            </div>
        </button>
    )
}