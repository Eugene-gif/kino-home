
import { APP_PREFIX, DEFAULT_TTL, STORAGE_KEYS } from "@/constants/constants";

interface CachedItem<T> {
  data: T;
  timestamp: number;
}

const getFromStorage = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;

  try {
    const item = localStorage.getItem(`${APP_PREFIX}${key}`);
    return item ? JSON.parse(item) as T : null;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return null;
  }
};

const saveToStorage = (key: string, data: unknown): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
};

const setCachedItem = <T>(key: string, data: T, ttlMs: number = DEFAULT_TTL): void => {
  const item: CachedItem<T> = {
    data,
    timestamp: Date.now() + ttlMs,
  }

  saveToStorage(key, item);
}

const getCachedItem = <T>(key: string): T | null => {
  const item = getFromStorage<CachedItem<T>>(key);

  if (!item) return null;

  if (Date.now() > item.timestamp) {
    removeFromStorage(key);
    return null;
  }

  return item.data;
}

const removeFromStorage = (key: string): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(`${APP_PREFIX}${key}`);
  } catch (e) {
    console.error(`Error removing ${key} from localStorage`, e);
  }
}

export { getFromStorage, saveToStorage, getCachedItem, setCachedItem, removeFromStorage, STORAGE_KEYS };
