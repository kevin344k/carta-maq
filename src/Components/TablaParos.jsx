import { useEffect, useState } from "react";

export default function TablaParos({ onDatosChange, reset }) {
  const headers_1 = ["Paros(Hrs)", "Operacionales", "Mecánicos"];
  const headers_2 = ["Ajenos", "Limpieza", "Alimentación"];

  const [horas, setHoras] = useState("");
  const [minutos, setMinutos] = useState("");

  const items = [
    "Freezer",
    "T. Enfriamiento",
    "Etiquetadora",
    "Selladora",
    "Codificador",
    "Equipo CO2",
    "Envolvedora",
    "Rayos X",
    "Otros",
  ];

  /**Inicializacion de arrays */
  const [datos, setDatos] = useState({
    operacionales: Array(9).fill(""),
    mecanicos: Array(9).fill(""),
    ajenos: Array(9).fill(""),
    limpieza: Array(9).fill(""),
    alimentacion: Array(1).fill(""),
  });

  /* Estado para saber qué celda se clikeó */
  const [modal, setModal] = useState({
    open: false,
    rowIdx: null,
    colIdx: null,
  });

  /**Función para abrir el modal */

  const abrirModal = (rowIdx, colKey) => {
    setModal({ open: true, rowIdx, colKey });
  };

  /**Función para guardar el valor en el array correcto */

  const guardarValor = (horas, minutos, colIdx, rowIdx) => {
    const h = parseInt(horas, 10);
    const m = parseInt(minutos, 10);

    const valor = normalizeTime(`${h}:${m}`);

    //pasar horas a decimales

    if (colIdx === 0) {
      setDatos((prev) => {
        const nuevosOperacionales = [...prev.operacionales];
        nuevosOperacionales[rowIdx] = valor;

        return {
          ...prev,
          operacionales: nuevosOperacionales,
        };
      });
    }

    if (colIdx === 1) {
      setDatos((prev) => {
        const nuevosMecanicos = [...prev.mecanicos];
        nuevosMecanicos[rowIdx] = valor;

        return {
          ...prev,
          mecanicos: nuevosMecanicos,
        };
      });
    }
    if (colIdx === 2) {
      setDatos((prev) => {
        const nuevosAjenos = [...prev.ajenos];
        nuevosAjenos[rowIdx] = valor;

        return {
          ...prev,
          ajenos: nuevosAjenos,
        };
      });
    }
    if (colIdx === 3) {
      setDatos((prev) => {
        const nuevosLimpieza = [...prev.limpieza];
        nuevosLimpieza[rowIdx] = valor;

        return {
          ...prev,
          limpieza: nuevosLimpieza,
        };
      });
    }
    if (colIdx === 4) {
      setDatos((prev) => {
        const nuevosAlimentacion = [...prev.alimentacion];
        nuevosAlimentacion[rowIdx] = valor;

        return {
          ...prev,
          alimentacion: nuevosAlimentacion,
        };
      });
    }

    setModal({ open: false, rowIdx: null, colKey: null });
    setHoras("");
    setMinutos("");
  };

  useEffect(() => {
    onDatosChange(datos);
  }, [datos, onDatosChange]);

  useEffect(() => {
    if (reset) {
      setDatos({
        operacionales: Array(9).fill(""),
        mecanicos: Array(9).fill(""),
        ajenos: Array(9).fill(""),
        limpieza: Array(9).fill(""),
        alimentacion: Array(1).fill(""),
      });
    }
  }, [reset]);

  function normalizeTime(value) {
    if (value === "" || value == null) return "00:00";

    value = String(value).trim();

    if (/^\d+$/.test(value)) {
      return `${String(parseInt(value)).padStart(2, "0")}:00`;
    }

    const parts = value.split(":");
    if (parts.length === 2) {
      let h = parseInt(parts[0].trim()) || 0;
      let m = parseInt(parts[1].trim()) || 0;

      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    }

    return "00:00";
  }

  function sumarHorasArray(arr) {
    let totalMinutos = 0;

    arr.forEach((item) => {
      let time = normalizeTime(item);
      const [h, m] = time.split(":").map(Number);
      totalMinutos += h * 60 + m;
    });

    let totalH = Math.floor(totalMinutos / 60);
    let totalM = totalMinutos % 60;

    return `${String(totalH).padStart(2, "0")}:${String(totalM).padStart(
      2,
      "0"
    )}`;
  }

  return (
    <div className="flex gap-2">
      <table className="w-full text-sm border border-red-800 rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            {headers_1.map((header, idx) => (
              <th key={idx} className="border px-3 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, rowIdx) => (
            <tr key={rowIdx}>
              <td className="border text-center text-xl">{item}</td>

              <td
                className="border text-center h-8 text-xl"
                onClick={() => abrirModal(rowIdx, 0)}
              >
                {datos.operacionales[rowIdx] || ""}
              </td>
              <td
                className="border text-center h-8 text-xl"
                onClick={() => abrirModal(rowIdx, 1)}
              >
                {datos.mecanicos[rowIdx] || ""}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-neutral-200">
            <td className="border font-semibold text-center text-xl">
              Sumatoria
            </td>
            <td className="border text-center text-xl">
              {sumarHorasArray(datos.operacionales)}
            </td>
            <td className="border text-center text-xl">
              {sumarHorasArray(datos.mecanicos)}
            </td>
          </tr>
        </tfoot>
      </table>

      <table className="table-fixed w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            {headers_2.map((header, idx) => (
              <th key={idx} className="border px-3 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map((item, rowIdx) => (
            <tr key={rowIdx}>
              <td
                className="border text-center h-[32px] text-xl"
                onClick={() => abrirModal(rowIdx, 2)}
              >
                {datos.ajenos[rowIdx] || ""}
              </td>
              <td
                className="border text-center h-4 text-xl"
                onClick={() => abrirModal(rowIdx, 3)}
              >
                {datos.limpieza[rowIdx] || ""}
              </td>

              {/* ALIMENTACIÓN: solo en la primera fila y abarca 9 filas */}
              {rowIdx === 0 && (
                <td
                  rowSpan={9} // o rowSpan={items.length} para que sea dinámico
                  className="border text-center cursor-pointer text-xl"
                  onClick={() => abrirModal(0, 4)} // colIdx=4 → alimentacion; usamos rowIdx=0
                >
                  {datos.alimentacion[0] || ""}
                </td>
              )}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-neutral-200">
            <td className="border text-center text-xl">
              {sumarHorasArray(datos.ajenos)}
            </td>
            <td className="border text-center text-xl">
              {sumarHorasArray(datos.limpieza)}
            </td>
            <td className="border text-center text-xl">
              {sumarHorasArray(datos.alimentacion)}
            </td>
          </tr>
        </tfoot>
      </table>

      {modal.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center ">
          <div className="bg-white p-4 py-6 rounded shadow">
            <h2>Duración de la paralizacion</h2>
            <p>{modal.colIdx}</p>
            <p>{modal.rowIdx}</p>
            <div className="bg-neutral-100 flex gap-3 p-5">
              <div className="flex flex-col">
                <label htmlFor="inpt_horas">Horas</label>
                <input
                  value={horas}
                  onChange={(e) => setHoras(e.target.value)}
                  type="text"
                  className="bg-white text-center"
                />
              </div>{" "}
              <span className="text-2xl self-end">:</span>
              <div className="flex flex-col">
                <label htmlFor="input_minutos">Minutos</label>
                <input
                  value={minutos}
                  onChange={(e) => setMinutos(e.target.value)}
                  className="bg-white text-center text-lg"
                  type="text"
                />
              </div>
            </div>
            <div className="flex gap-5 w-full mt-4 justify-end">
              <button
                onClick={() => setModal({ open: false })}
                type="button"
                className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() =>
                  guardarValor(horas, minutos, modal.colKey, modal.rowIdx)
                }
                type="button"
                className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
