'use client';

import { useElapsedTime } from "@/hooks/useElapsedTime";
import { getDurationParts, toNairobiTime } from "@/lib/utils";
import { motion } from "framer-motion";


type Props = {
    startTime: string; // ISO string
    title?: string;
}


function MechanicalDigit({ digit }: { digit: number }) {
    return (
        <div
            className="
                relative
                h-[1.2em]
                w-[0.8em]
                overflow-hidden
            "
        >
            <motion.div
                animate={{
                    y: `-${digit * 1.2}em`,
                }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 28,
                }}
                className="absolute left-0 top-0 w-full"
            >
                {Array.from({ length: 10 }).map((_, i) => (
                    <div
                        key={i}
                        className="
                            h-[1.2em]
                            flex
                            items-center
                            justify-center
                        "
                    >
                        {i}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}


function MechanicalNumber({ value }: { value: number }) {
    const str = value.toString().padStart(2, "0");

    return (
        <div className="flex">
            <MechanicalDigit digit={Number(str[0])} />
            <MechanicalDigit digit={Number(str[1])} />
        </div>
    );
}


function TimeBlock({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    return (
        <div className="flex flex-col items-center">
            <MechanicalNumber value={value} />
            <span className="text-xs text-zinc-500 mt-2">{label}</span>
        </div>
    );
}


export default function ElapsedTimeCard({ 
    startTime, title = "Elapsed Time" }: Props) 
{
    const { elapsedMs } = useElapsedTime(startTime);

    const { days, hours, minutes, seconds,} = 
        getDurationParts(elapsedMs);

    const localStart = toNairobiTime(startTime);

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-2xl
                       p-5 bg-zinc-900 text-white 
                       shadow-lg w-full max-w-md"
        >
            <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-zinc-400">
                    {title ?? "Session"}
                </div>
                <div className="text-xs text-zinc-500">
                    {localStart}
                </div>
            </div>




            <div className="flex items-center justify-center gap-3 text-2xl font-bold tabular-nums">
                <TimeBlock label="D" value={days} />
                <span className="text-zinc-600">:</span>

                <TimeBlock label="H" value={hours} />
                <span className="text-zinc-600">:</span>

                <TimeBlock label="M" value={minutes} />
                <span className="text-zinc-600">:</span>

                <TimeBlock label="S" value={seconds} />
            </div>

        </motion.div>
  );
}