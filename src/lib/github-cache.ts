const CACHE_KEY_PREFIX = 'github-dates:v1:'
const RETRY_AT_KEY = 'github-api-retry-at:v1'
let memoryRetryAt: number | undefined

export interface CachedGithubDates {
  createdAt: string
  updatedAt: string
  createdAtCheckedAt: number
  updatedAtCheckedAt: number
}

function getCacheKey(repository: string) {
  return `${CACHE_KEY_PREFIX}${repository.toLowerCase()}`
}

function isDate(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value))
}

function isCachedGithubDates(value: unknown): value is CachedGithubDates {
  if (!value || typeof value !== 'object') return false
  const cache = value as Record<string, unknown>

  return (
    isDate(cache.createdAt) &&
    isDate(cache.updatedAt) &&
    typeof cache.createdAtCheckedAt === 'number' &&
    typeof cache.updatedAtCheckedAt === 'number'
  )
}

export function readGithubCache(
  repository: string
): CachedGithubDates | undefined {
  try {
    const storedValue = localStorage.getItem(getCacheKey(repository))
    if (!storedValue) return

    const value: unknown = JSON.parse(storedValue)
    if (isCachedGithubDates(value)) return value
  } catch {
    // Storage may be unavailable or contain an obsolete value.
  }
}

export function writeGithubCache(repository: string, value: CachedGithubDates) {
  try {
    localStorage.setItem(getCacheKey(repository), JSON.stringify(value))
  } catch {
    // The dates still work for this visit when storage is unavailable.
  }
}

export function readGithubRetryAt() {
  try {
    const storedRetryAt = Number(localStorage.getItem(RETRY_AT_KEY))
    const retryAt = Math.max(memoryRetryAt ?? 0, storedRetryAt)
    return Number.isFinite(retryAt) && retryAt > Date.now()
      ? retryAt
      : undefined
  } catch {
    return memoryRetryAt && memoryRetryAt > Date.now()
      ? memoryRetryAt
      : undefined
  }
}

export function writeGithubRetryAt(retryAt: number) {
  memoryRetryAt = retryAt

  try {
    localStorage.setItem(RETRY_AT_KEY, String(retryAt))
  } catch {
    // The in-memory value still stops requests during this visit.
  }
}

export function clearGithubRetryAt() {
  memoryRetryAt = undefined

  try {
    localStorage.removeItem(RETRY_AT_KEY)
  } catch {
    // Storage may be unavailable.
  }
}
