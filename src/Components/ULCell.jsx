
import { parseHoursToInt } from "../Utils/time";

function UlCell({ item }) {
  
  
  const entregada = Number(item?.cant_entregada) || Number(item?.Cant_Entregada) ;
  const velocidad = Number(item?.Velocidad_nominal);
  const horasTeoricas = parseHoursToInt(item?.Hrs_Teoricas);

console.log(entregada,velocidad,horasTeoricas);
  
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
    ? "px-2 py-2 text-center bg-green-600 text-white font-medium rounded-sm"
    : "px-2 py-2  text-center bg-red-600 text-white font-medium rounded-sm";

  return (
    <div className={ul == null ? "px-3 py-2 text-center bg-gray-200 text-gray-700" : tdClass}>
      {ulDisplay}
    </div>
  );
}

export default UlCell;
