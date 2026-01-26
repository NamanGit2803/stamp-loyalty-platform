// lib/rateLimit.js

const rateLimitMap = new Map();

/**
 * Simple rate limiter
 * @param {string} key - usually email or IP
 * @param {number} limit - max requests
 * @param {number} windowMs - time window in ms
 * @returns {boolean} allowed or not
 */
export function rateLimit(
    key,
    limit = 5,
    windowMs = 5 * 60 * 1000 // 5 minutes
) {
    const now = Date.now();
    const record = rateLimitMap.get(key);

    // First request or window expired
    if (!record || now - record.startTime > windowMs) {
        rateLimitMap.set(key, {
            count: 1,
            startTime: now,
        });
        return true;
    }

    // Exceeded limit
    if (record.count >= limit) {
        return false;
    }

    // Increase count
    record.count += 1;
    rateLimitMap.set(key, record);

    return true;
}
