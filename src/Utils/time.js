
// utils/time.js
export function parseHoursToInt(input) {
  if (input == null) return null;

  // Si ya es número (o string numérico), normaliza.
  if (typeof input === "number") {
    return Number.isFinite(input) ? Math.floor(input) : null;
  }
  if (/^\d+(\.\d+)?$/.test(String(input))) {
    return Math.floor(Number(input));
  }

  // Espera formato "HH:MM" o "HH:MM:SS"
  const parts = String(input).trim().split(":");
  if (parts.length < 2) return null;

  const h = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) || 0;
  const s = parseInt(parts[2], 10) || 0;

  if (!Number.isFinite(h) || h < 0) return null;

  // Si quieres un entero puro (p.ej. 12:30 => 12), usa solo horas.
  // Si prefieres incluir minutos (12:30 => 12.5), cambia a: h + m/60 + s/3600
  return h; // ← entero, “12:00” => 12, “12:59” => 12
}
