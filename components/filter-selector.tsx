"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function FilterSelector() {
    const router = useRouter()
    const params = useSearchParams()
    const currentFilter = params.get("filter") ?? "this-month"

    const handleChange = (value: string) => {
        const newParams = new URLSearchParams(params)
        newParams.set("filter", value)
        router.replace(`?${newParams.toString()}`)
    }

    return (
        <Select value={currentFilter} onValueChange={handleChange}>
        <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter period" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="last-3-months">Last 3 Months</SelectItem>
            <SelectItem value="all-time">All Time</SelectItem>
        </SelectContent>
        </Select>
    )
}