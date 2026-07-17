// Geologic time scale for the fossil age bar. Boundaries in millions of years
// ago (mya), Phanerozoic only (0–541), which covers everything we carry.
// Positions use a sqrt scale so recent periods (where most fossils sit) get
// enough visual room instead of bunching at the left edge of a linear axis.

export interface Period {
  name: string;
  short: string;
  start: number; // older boundary, mya
  end: number;   // younger boundary, mya
}

export const PERIODS: Period[] = [
  { name: "Quaternary", short: "Qua", start: 2.58, end: 0 },
  { name: "Neogene", short: "Neo", start: 23.03, end: 2.58 },
  { name: "Paleogene", short: "Pal", start: 66, end: 23.03 },
  { name: "Cretaceous", short: "Cret", start: 145, end: 66 },
  { name: "Jurassic", short: "Jur", start: 201, end: 145 },
  { name: "Triassic", short: "Tri", start: 252, end: 201 },
  { name: "Permian", short: "Perm", start: 299, end: 252 },
  { name: "Carboniferous", short: "Carb", start: 359, end: 299 },
  { name: "Devonian", short: "Dev", start: 419, end: 359 },
  { name: "Silurian", short: "Sil", start: 444, end: 419 },
  { name: "Ordovician", short: "Ord", start: 485, end: 444 },
  { name: "Cambrian", short: "Cam", start: 541, end: 485 },
];

export const TIME_START = 541; // oldest edge of the axis (mya)

// Map an age (mya) to a 0–100% position on the axis. 0 mya (today) = right edge
// (100%), TIME_START mya = left edge (0%). sqrt scale expands recent time.
export function ageToPct(mya: number): number {
  const clamped = Math.max(0, Math.min(TIME_START, mya));
  const t = Math.sqrt(clamped) / Math.sqrt(TIME_START); // 0 (today) .. 1 (oldest)
  return (1 - t) * 100; // flip so today is on the right
}

// Parse an ageMya field ("48–56", "0.79", "~50") to a midpoint number.
export function ageMidpoint(ageMya: string | number): number {
  if (typeof ageMya === "number") return ageMya;
  const nums = (String(ageMya).match(/[\d.]+/g) || []).map(Number);
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}
