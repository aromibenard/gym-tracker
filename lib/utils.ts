import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const MuscleGroups = [
  { name: 'Chest', value: 'chest' },
  { name: 'Back', value: 'back' },
  { name: 'Shoulders', value: 'shoulders' },
  { name: 'Arms', value: 'arms' },
  { name: 'Legs', value: 'legs' },
]


export function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);

  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  const days = Math.floor(hours / 24);

  const remainingHours = hours % 24;

  if (days > 0) {
    return `${days}d ${remainingHours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
}


export function toNairobiTime(iso: string) {
  return new Date(iso).toLocaleString("en-KE", {
    timeZone: "Africa/Nairobi",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getDurationParts(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);

    const days = Math.floor(totalSeconds / 86400);

    const hours = Math.floor(totalSeconds / 3600) % 24;

    const minutes = Math.floor(totalSeconds / 60) % 60;

    const seconds = totalSeconds % 60;

    return {
        days,
        hours,
        minutes,
        seconds,
    };
}

