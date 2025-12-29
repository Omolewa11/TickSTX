// ========================================
// Activity Tracker - localStorage Management
// ========================================

interface Activity {
  id: string;
  type: 'increment' | 'decrement' | 'reset';
  amount: number;
  timestamp: Date;
  txId?: string;
}

const STORAGE_KEY = 'tickstx_stats';
const MAX_ACTIVITIES = 20;

/**
 * Load activities from localStorage
 */
export function loadActivities(): Activity[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    return parsed.map((activity: any) => ({
      ...activity,
      timestamp: new Date(activity.timestamp),
    }));
  } catch (error) {
    console.error('Failed to load activities:', error);
    return [];
  }
}

/**
 * Save a new activity to localStorage
 */
export function saveActivity(
  type: 'increment' | 'decrement' | 'reset',
  amount: number,
  txId?: string
): void {
  if (typeof window === 'undefined') return;

  try {
    const activities = loadActivities();
    const newActivity: Activity = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      amount,
      timestamp: new Date(),
      txId,
    };

    // Add to beginning and limit to MAX_ACTIVITIES
    const updated = [newActivity, ...activities].slice(0, MAX_ACTIVITIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    console.log('✅ Activity saved:', newActivity);
  } catch (error) {
    console.error('Failed to save activity:', error);
  }
}

/**
 * Clear all activities from localStorage
 */
export function clearActivities(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('✅ Activities cleared');
  } catch (error) {
    console.error('Failed to clear activities:', error);
  }
}
