/**
 * Minimal in-memory cache with TTL.
 * Avoids repeated DB reads for public data that rarely changes.
 *
 * Usage:
 *   const cache = require("./cache");
 *   const data = await cache.get("key", () => expensiveDbCall(), 60);
 */

const store = new Map(); // key → { value, expiresAt }

const cache = {
  /**
   * @param {string} key
   * @param {() => Promise<any>} fetcher  called only on cache miss
   * @param {number} ttlSeconds           default 60
   */
  async get(key, fetcher, ttlSeconds = 60) {
    const hit = store.get(key);
    if (hit && hit.expiresAt > Date.now()) return hit.value;

    const value = await fetcher();
    store.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
    return value;
  },

  /** Invalidate a key so the next read goes to the DB */
  bust(key) {
    store.delete(key);
  },
};

module.exports = cache;
