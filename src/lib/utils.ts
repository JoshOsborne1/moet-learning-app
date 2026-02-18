import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getScoreGrade(score: number, total: number): { grade: string; color: string; points: number } {
    const pct = (score / total) * 100;
    if (pct >= 85) return { grade: 'Distinction', color: 'text-yellow-400', points: 4.5 };
    if (pct >= 75) return { grade: 'Merit', color: 'text-blue-400', points: 3 };
    if (pct >= 60) return { grade: 'Pass', color: 'text-green-400', points: 1.5 };
    return { grade: 'Fail', color: 'text-red-400', points: 0 };
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
