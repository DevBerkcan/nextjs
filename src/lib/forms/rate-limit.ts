// Einfaches In-Memory Rate Limiting (pro Instanz). Fuer Produktion ggf.
// auf Upstash/Redis umstellen (Variablen in .env.example vorbereitet).
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW = (Number(process.env.RATE_LIMIT_WINDOW) || 60) * 1000;
const MAX = Number(process.env.RATE_LIMIT_TOKENS) || 5;

export function rateLimit(key: string): boolean {
  const now = Date.now();
  const e = hits.get(key);
  if (!e || now - e.ts > WINDOW) { hits.set(key, { count: 1, ts: now }); return true; }
  if (e.count >= MAX) return false;
  e.count += 1; return true;
}
