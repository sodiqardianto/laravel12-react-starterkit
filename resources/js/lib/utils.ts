import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Convert text to Title Case
 * Example: "hello world" -> "Hello World"
 */
export function capitalizeWords(str: string): string {
    if (!str || typeof str !== 'string') return '';

    return str
        .toLowerCase()
        .split(' ')
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
