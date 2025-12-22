
import { useEffect, useState } from "react";
import ButMenu from "../Components/ButMenu";
import UlCell from "../Components/ULCell";
import datos from "../data.json";
// import RowParos from "../Components/RowParos";

function UlDashboard() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtroLinea,setFiltroLinea]=useState("")


console.log(filtroLinea);



  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);



  //Query params
    const params=new URLSearchParams();
    params.set("page",String(page))
    params.set("pageSize",String(pageSize))
    if(filtroLinea)params.set("linea",filtroLinea)


    fetch(`http://10.72.21.163:3000/api/ul-data?${params.toString()}`, {
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        // Estructura esperada: { data, page, pageSize, total, totalPages, hasMore }
        setData(json.data ?? []);
        setTotal(json.total ?? null);
        setTotalPages(json.totalPages ?? null);
        setHasMore(!!json.hasMore);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
        setData([]);
        setHasMore(false);
        setTotalPages(null);
        setTotal(null);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [page, pageSize,filtroLinea]);

  const formatFecha = (fecha) => {
    if (!fecha) return "";
    return new Date(fecha).toLocaleDateString("es-EC", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timeZone: "America/Guayaquil",
    });
  };

  const renderHrs = (val) => {
    // Si viene como string "HH:MM:SS", recorta a "HH:MM".
    // Si es número, muéstralo tal cual. Si es null/undefined, vacío.
    if (typeof val === "string") return val.slice(0, 5);
    if (val === null || val === undefined) return "";
    return val;
  };

  return (
    <div className="px-2 lg:w-[97%] mx-auto mt-7">
      <ButMenu />
      

      {/* Controles de paginación */}
      <div className="flex items-center gap-4 mb-3 mr-15">
        <label className="text-sm">
          Tamaño de página:&nbsp;
          <select
            className="border border-neutral-300 rounded-sm px-2 py-1"
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
           <div className="w-40 flex gap-2 items-center">
                      <label className="block text-gray-600 font-medium mb-1">
                        Línea
                      </label>
                      <select
                        value={filtroLinea}
                        name="Linea"
                        onChange={(e) => {
                          setFiltroLinea(e.target.value);
                        }}
                        className="w-fit px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      >
                        <option value="">-- Elige --</option>
                        {datos.Helados.Lineas.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

        <div className="ml-auto flex items-center gap-2 ">
          <button
            className="px-2 py-2  bg-neutral-100 text-gray-600  rounded-full hover:bg-blue-500 cursor-pointer"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={loading || page <= 1}
          >
          
                  <svg
            className="w-5 h-5 text-gray-400 rotate-90 hover:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          </button>
          <span className="text-sm">Página {page} de {totalPages ?? "…"}</span>
          <button
            className="px-2 py-2  bg-gray-100 text-gray-600  rounded-full hover:bg-blue-500 cursor-pointer"
            onClick={() => setPage((p) => p + 1)}
            disabled={loading || !hasMore}
          >
           
                 <svg
            className="w-5 h-5 text-gray-400 rotate-270 hover:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          </button>
        </div>
      </div>

      {error && <div className="text-red-600 mb-2">Error: {error}</div>}
      {loading && <div className="mb-2">Cargando…</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-2 py-2 text-left">Doc. N°</th>
              <th className="px-2 py-2 text-left">Supervisor</th>
              <th className="px-2 py-2 text-left">Orden</th>
              <th className="px-2 py-2 text-left">Fecha</th>
              <th className="px-2 py-2 text-left">Linea</th>
              <th className="px-2 py-2 text-left">Codigo</th>
              <th className="px-2 py-2 text-left">Descripcion</th>
              <th className="px-2 py-2 text-left">Lider</th>
              <th className="px-2 py-2 text-left">Hrs. Teoricas</th>
              <th className="px-2 py-2 text-left">Hrs. Produccion</th>
              <th className="px-2 py-2 text-left">Cant. Entregada</th>
              <th className="px-2 py-2 text-left">UL</th>
              <th className="px-2 py-2 text-left">Merma</th>
              <th className="px-2 py-2 text-left">...</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="odd:bg-white even:bg-gray-50">
                <td className="px-2 text-center py-2 md:text-xs">{item.doc_num}</td>
                <td className="px-2 text-center py-2 md:text-xs">{item.supervisor}</td>
                <td className="px-2 text-center py-2 md:text-xs">{item.orden}</td>
                <td className="px-2 text-center py-2 md:text-xs">{formatFecha(item.fecha)}</td>
                <td className="px-2 text-center py-2 md:text-xs">{item.linea}</td>
                <td className="px-2 text-center py-2 md:text-xs">{item.codigo}</td>
                <td className="px-2 text-center py-2 md:text-xs">{item.Descripcion}</td>
                <td className="px-2 text-center py-2">{item.lider}</td>
                <td className="px-2 text-center py-2">{renderHrs(item.Hrs_Teoricas)}</td>
                <td className="px-2 text-center py-2">{renderHrs(item.Hrs_Produccion)}</td>
                <td className="px-2 text-center py-2 truncate">{item.cant_entregada}</td>
                <td className="px-2 text-center py-2 truncate">
                  <UlCell item={item} />
                </td>
                <td className="px-4 py-2">{item.merma} kg</td>
              </tr>
              // Si luego quieres mostrar paros debajo:
              // <RowParos nominal_v={item.Velocidad_nominal} obs={item.observaciones} paros={item.paros} />
            ))}
          </tbody>
        </table>

        <div className="mt-2 text-sm">Total registros: {total ?? "…"}</div>
      </div>
    </div>
  );
}

export default UlDashboard;
``
