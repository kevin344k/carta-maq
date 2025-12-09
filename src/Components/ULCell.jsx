
import { parseHoursToInt } from "../Utils/time";

function UlCell({ item }) {
  const entregada = Number(item?.Cant_Entregada);
  const velocidad = Number(item?.Velocidad_nominal);
  const horasTeoricas = parseHoursToInt(item?.Hrs_Teoricas);

  // Validaciones básicas
  const canCalc =
    Number.isFinite(entregada) &&
    Number.isFinite(velocidad) &&
    horasTeoricas != null &&
    horasTeoricas > 0 &&
    velocidad > 0;

  const ul = canCalc
    ? ((entregada / velocidad) / horasTeoricas) * 100
    : null;

  // Formato (limitar a 1 decimal)
  const ulDisplay = ul != null ? `${ul.toFixed(1)} %` : "—";

  // Estilos condicionales
  const isGood = ul != null && ul >= 50;
  const tdClass = isGood
    ? "px-4 py-2 bg-green-600 text-white font-medium rounded-sm"
    : "px-4 py-2 bg-red-600 text-white font-medium rounded-sm";

  return (
    <td className={ul == null ? "px-4 py-2 bg-gray-200 text-gray-700" : tdClass}>
      {ulDisplay}
    </td>
  );
}

export default UlCell;
