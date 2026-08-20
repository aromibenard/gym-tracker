import { SessionStatus } from '@/app/generated/prisma'
import { db } from '@/client'
import { currentUser } from '@clerk/nextjs/server'
import { endOfMonth, format, getDate, getISOWeek, startOfMonth, subMonths } from 'date-fns'

export async function getFilteredVolume(
    duration: string | undefined | null
) {
    let startDate = undefined
    let endDate = undefined

    const range = duration ?? 'this-month'

    switch (range) {
        case 'this-month': {
            const today = new Date()
            startDate = startOfMonth(today)
            endDate = endOfMonth(today)

            break
        }

        case "last-month": {
            const lastMonth = subMonths(new Date(), 1)
            startDate = startOfMonth(lastMonth)
            endDate = endOfMonth(lastMonth)

            break
        }

        case "last-3-months": {
            startDate = subMonths(new Date(), 3)
            endDate = new Date()

            break
        }

        case "all-time": {
            startDate = new Date(0) // Jan 1st 1970🫥
            endDate = new Date()

            break
        }

        default: {
            // fallback for unknown strings
            const today = new Date()
            startDate = startOfMonth(today)
            endDate = endOfMonth(today)

            break
        }
    }

    try {
        const user = await currentUser()

        if (!user) {
            console.error('Missing user Id')
            return []
        }

        const data = await db.session.findMany({
            where: {
                userId: user.id,
                status: SessionStatus.COMPLETED,
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include: {
                exercises: {
                    include: {
                        sets: true
                    }
                }
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        if (data.length === 0) return []

        // Grouping based on range
        const groups = new Map<string, { volume: number }>()

        for (const session of data) {
            const date = session.createdAt
            let key: string

            switch (range) {
                case 'last-month':
                case 'this-month':
                    // 01, 02, 03...
                    key = String(getDate(date)).padStart(2, '0')

                    break
                
                case 'last-3-months':
                    // 2026-W34
                    key = `${date.getFullYear()}-W${String(getISOWeek(date)).padStart(2, '0')}`

                    break
                
                case 'all-time':
                default:
                    // Group by month
                    key = format(date, 'yyyy-MM')

                    break
            }

            // Total Volume Calculation
            let sessionVolume = 0

            for (const exercise of session.exercises) {
                for (const set of exercise.sets) {
                    sessionVolume += (set.weight ?? 0) * (set.reps ?? 0)
                }
            }

            const existing = groups.get(key)

            groups.set(key, {
                volume: (existing?.volume ?? 0) + sessionVolume
            })
        }

        return Array.from(groups.entries()).map(([date, data]) => ({
            date,
            volume: data.volume
        }))



    } catch (error) {
        console.error('Failed to get filtered volume:', error)
        return []
    }
}