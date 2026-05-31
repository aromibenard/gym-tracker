'use client'

import { ExerciseWithRelations } from "@/lib/data/getExercises"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"


type ExerciseScrollerProps<T extends ExerciseWithRelations> = {
    exercises: T[]
    renderContent?: (exercise: T) => React.ReactNode
    className?: string
}


export default function ExerciseScroller<T extends ExerciseWithRelations>({ 
    exercises, 
    renderContent, 
    className 
}: ExerciseScrollerProps<T>) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const children = Array.from(container.children)

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = children.indexOf(entry.target)
                        setActiveIndex(index)
                    }
                })
            },
            { threshold: 0.6 }
        )

        children.forEach((child) => observer.observe(child))

        return () => observer.disconnect()
    }, [exercises])

    const scrollTo = (direction: 'up' | 'down') => {
        const container = containerRef.current
        if (!container) return

        const nextIndex =
            direction === 'down'
                ? Math.min(activeIndex + 1, exercises.length - 1)
                : Math.max(activeIndex - 1, 0)

        const target = container.children[nextIndex] as HTMLElement

        target?.scrollIntoView({
            behavior: 'smooth',
        })
    }


    return (
        <div className={cn('relative h-screen overflow-hidden', className)}>
            {/* Floating Controls */}
            <div className='absolute right-4 top-1/2 z-50 -translate-y-1/2 hidden md:flex flex-col gap-3'>
            <button
                onClick={() => scrollTo('up')}
                className='rounded-full bg-black/40 p-3 text-white backdrop-blur transition hover:scale-105 hover:bg-black/60'
            >
                <ChevronUp size={22} />
            </button>

            <button
                onClick={() => scrollTo('down')}
                className='rounded-full bg-black/40 p-3 text-white backdrop-blur transition hover:scale-105 hover:bg-black/60'
            >
                <ChevronDown size={22} />
            </button>
            </div>

            {/* Scroll Container */}
            <div
                ref={containerRef}
                className='h-full snap-y snap-mandatory overflow-y-scroll scroll-smooth scrollbar-none'
            >
            {exercises.map((exercise, index) => (
                <section
                    key={exercise.id}
                    className='relative flex h-screen snap-start items-center justify-center overflow-hidden'
                >
                {/* Background */}
                <div className='absolute inset-0'>
                    <div className='h-full w-full bg-gradient-to-br from-zinc-900 via-black to-zinc-800' />

                    <div className='absolute inset-0 bg-black/45 backdrop-[2px]' />
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: activeIndex === index ? 1 : 0.6, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className='relative z-10 mx-auto flex w-full max-w-2xl flex-col justify-end px-6 pb-24 text-white'
                >
                    {renderContent ? (
                        renderContent(exercise)
                        ) : (
                    <>
                        <span className='mb-3 w-fit rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur'>
                        <p>musclegroup</p>
                        </span>

                        <h2 className='text-4xl font-black tracking-tight md:text-6xl'>
                        {exercise.name}
                        </h2>

                        <p className='mt-4 max-w-xl text-base leading-relaxed text-zinc-200 md:text-lg'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
                        </p>

                        <div>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="session-form">
                                    <AccordionTrigger>
                                        Log Session
                                    </AccordionTrigger>
                                    <AccordionContent>
                                    
                                    </AccordionContent>
                                </AccordionItem>

                            </Accordion>
                        </div>
                    </>
                    )}
                </motion.div>

                {/* Progress Indicator */}
                <div className='absolute right-4 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2'>
                    {exercises.map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                        'h-2 w-2 rounded-full transition-all duration-300',
                        i === activeIndex
                            ? 'h-8 bg-white'
                            : 'bg-white/40'
                        )}
                    />
                    ))}
                </div>
                </section>
            ))}
            </div>
        </div>
    )
}