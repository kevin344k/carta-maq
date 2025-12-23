
function toMinutes(val) {
  if (val == null) return 0;

  if (typeof val === "number") {
    // Si decides que tus números ya vienen en MINUTOS, descomenta la siguiente línea y comenta el bloque de segundos:
    // return val;

    // Heurística: si el número es mayor a 10,000 asumimos que son segundos (ajústalo a tu realidad)
    return val > 10000 ? Math.round(val / 60) : val;
  }

  if (typeof val === "string") {
    const parts = val.split(":").map(Number);
    if (parts.length === 2) {
      const [h, m] = parts;
      return (h || 0) * 60 + (m || 0);
    } else if (parts.length === 3) {
      const [h, m, s] = parts;
      return (h || 0) * 60 + (m || 0) + Math.round((s || 0) / 60);
    } else {
      // Si te llega "90" como string
      const n = Number(val);
      return Number.isFinite(n) ? n : 0;
    }
  }

  return 0;
}

/** Suma un array de duraciones a minutos */
function sumMinutes(arr) {
  if (!Array.isArray(arr)) return 0;
  return arr.reduce((acc, v) => acc + toMinutes(v), 0);
}

/** Formatea minutos a "HH:MM" */
function formatHHMM(totalMin) {
  const hours = Math.floor(totalMin / 60);
  const minutes = totalMin % 60;
  // Si quieres que horas no tenga padding, deja `${hours}`; si quieres 2 dígitos, usa padStart.
  return `${hours}:${String(minutes).padStart(2, "0")}`;
}

/**
 * RowParos: renderiza una fila con los totales por cada tipo de paro.
 * Espera un objeto: { ajenos: [], limpieza: [], mecanicos: [], alimentacion: [], operacionales: [] }
 */
export default function RowParos({ paros, obs,nominal_v }) {
  // Evita errores si paros viene vacío o parcialmente
  console.log(obs);

  const tipos = [
    "ajenos",
    "limpieza",
    "mecanicos",
    "alimentacion",
    "operacionales",
  ];

  // Calcula totales en minutos por tipo
  const totalesMin = tipos.reduce((acc, tipo) => {
    acc[tipo] = sumMinutes(paros?.[tipo] || []);
    return acc;
  }, {});

  // Opcional: log para verificar
  // console.log('Totales en minutos:', totalesMin);

  return (
    <tr className="relative h-18 py-12">
      <div className="w-full pl-12 absolute left-0 gap-12 ">
        {/* Un ejemplo: primera celda título */}

        <div className="flex gap-15 items-center justify-center">
          {/* Una celda por cada tipo, mostrando HH:MM */}
          <div>
            <span className=" italic">Velocidad Nominal: </span>
            {nominal_v}
          </div>
          <div className="flex items-center justify-center gap-12">
            {tipos.map((tipo) => (
              <div key={tipo} className=" flex flex-col">
                <span className="italic"> {tipo}</span> <span>{formatHHMM(totalesMin[tipo])}</span>
              </div>
            ))}
          </div>
          <div className="w-full">
            <span className="text-neutral-700 underline italic">Observaciones:</span>{" "}
            {obs}
          </div>
        </div>
      </div>
    </tr>
  );
}
