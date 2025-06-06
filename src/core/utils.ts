import { randomUUID } from 'node:crypto';

export function generateUUID(): string {
  return randomUUID();
}


export function generateTimestamp(): number {
  const now = Date.now(); // Current timestamp in milliseconds (e.g., 1717670000123)

  // Set an epoch to the start of the current day (midnight)
  // This ensures the generated number is always relatively small and fits into an Int.
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0); // Reset to midnight today (e.g., 1717632000000)

  // Calculate milliseconds elapsed since the start of today
  const relativeMilliseconds = now - startOfDay.getTime();
  // This number will be between 0 and 86,399,999 (milliseconds in a day - 1).
  // This range fits perfectly into a 32-bit signed integer (max ~2.1 billion).

  // IMPORTANT CAVEAT:
  // This is NOT a universal Unix timestamp. Its value resets every day at midnight.
  // For example, 1000 on June 5th at 00:00:01 will be the same as 1000 on June 6th at 00:00:01.
  // Use this ONLY if your tests specifically require a unique, incrementing number
  // with millisecond granularity within a short period (e.g., a single test run or day),
  // and do NOT rely on the absolute chronological order of entries across multiple days.
  return relativeMilliseconds;
}