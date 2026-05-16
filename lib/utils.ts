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
