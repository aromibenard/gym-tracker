import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type CardProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
}

export function Card({
  children,
  className,
  onClick,
  href,
}: CardProps) {
  const content = (
    <>
      {/* Background layer */}
      <div
        className="
          absolute
          left-2
          -right-2
          top-2
          bottom-0
          rounded-xl
          bg-zinc-900 dark:bg-zinc-700
          transition-all duration-150
          group-hover:left-1
          group-hover:-right-1
          group-hover:top-1
          group-active:left-0
          group-active:right-0
          group-active:top-0
        "
      />

      {/* Main card */}
      <div
        className="
          relative z-10
          rounded-xl
          border border-zinc-200/60 dark:border-zinc-700
          bg-white dark:bg-zinc-900
          p-6
          transition-all duration-150
          group-hover:-translate-y-0.5
          group-active:translate-y-0.75
        "
      >
        {children}
      </div>
    </>
  )

  // Link version
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          'relative group block active:translate-y-0.75',
          className
        )}
      >
        {content}
      </Link>
    )
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative group active:translate-y-0.75',
        className
      )}
    >
      {content}
    </div>
  )
}