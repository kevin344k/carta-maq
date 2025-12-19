import { useEffect, useState } from "react";
import ButMenu from "../Components/ButMenu";
import UlCell from "../Components/ULCell";
import Filter from "../Components/Filter";
import RowParos from "../Components/RowParos";

function UlDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://10.72.21.163:3000/api/ul-data") // mismo dominio, Express sirve API
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .catch((err) => console.error("Error:", err));
  }, []);
  console.log(data);

  return (
    <div className="px-2 lg:w-[97%] mx-auto mt-7">
      <ButMenu></ButMenu>
      <Filter></Filter>
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
              <>  <tr className="odd:bg-white even:bg-gray-50 key={item.id}">
                <td className=" odd:bg-white even:bg-gray-50 px-2 text-center py-2 md:text-xs">
                  {item.doc_num}
                </td>
                <td className=" odd:bg-white even:bg-gray-50 px-2 text-center py-2 md:text-xs">
                  {item.supervisor}
                </td>
                <td className=" odd:bg-white even:bg-gray-50 px-2 text-center py-2 md:text-xs">
                  {item.orden}
                </td>
                <td className=" odd:bg-white even:bg-gray-50 px-2 text-center py-2 md:text-xs">
                  {new Date(item.fecha).toLocaleDateString("es-EC", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    timeZone: "America/Guayaquil",
                  })}
                </td>
                <td className="odd:bg-white even:bg-gray-50 px-2 text-center py-2 md:text-xs">
                  {item.linea}
                </td>
                <td className="odd:bg-white even:bg-gray-50 px-2 text-center py-2 md:text-xs">
                  {item.codigo}
                </td>
                <td className="odd:bg-white even:bg-gray-50 px-2 text-center py-2 md:text-xs">
                  {item.Descripcion}
                </td>
                <td className="odd:bg-white even:bg-gray-50 px-2 text-center py-2">
                  {item.lider}
                </td>
                <td className="odd:bg-white even:bg-gray-50 px-2 text-center py-2">
                  {item.Hrs_Teoricas?.slice(0, 5)}
                </td>
                <td className="odd:bg-white even:bg-gray-50 px-2 text-center py-2">
                  {item.Hrs_Produccion?.slice(0, 5)}
                </td>

                <td className="odd:bg-white even:bg-gray-50 px-2 text-center py-2 truncate">
                  {item.cant_entregada}
                </td>
                <td className="odd:bg-white even:bg-gray-50 px-2 text-center py-2 truncate">
                  <UlCell item={item} />
                </td>

                <td className="px-4 py-2">{item.merma} kg</td>
              </tr>
             
            {/*    <RowParos  nominal_v={item.Velocidad_nominal}  obs={item.observaciones} paros={item.paros}></RowParos>*/}
           
              </>
            
              
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UlDashboard;
