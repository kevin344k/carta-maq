
import { useEffect, useState } from "react";
import ButMenu from "../Components/ButMenu";
import UlCell from "../Components/ULCell";

function UlDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://10.72.21.163:3000/api/ul-data") // mismo dominio, Express sirve API
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error:", err));
      
  }, []);
  console.log(data);
  







  return (
    <div className="px-2 lg:w-[95%] mx-auto mt-12">
     
   <ButMenu></ButMenu>
<div class="overflow-x-auto">
  <table class="min-w-full border border-gray-300 text-sm">
    <thead>
      <tr class="bg-gray-200">
        <th class="px-4 py-2 text-left">ID</th>
        <th class="px-4 py-2 text-left">Doc. N°</th>
         <th class="px-4 py-2 text-left">Orden</th>
         <th class="px-4 py-2 text-left">Fecha</th>
        <th class="px-4 py-2 text-left">Linea</th>
         <th class="px-4 py-2 text-left">Codigo</th>
          <th class="px-4 py-2 text-left">Descripcion</th>
          <th class="px-4 py-2 text-left">Lider</th>
          <th class="px-4 py-2 text-left">Cant. Entregada</th>
           <th class="px-4 py-2 text-left">UL</th>
              <th class="px-4 py-2 text-left">Merma</th>
      </tr>
    </thead>
    <tbody>


  {data.map((item) => (
          <tr className="odd:bg-white even:bg-gray-50 key={item.id}">
             <td className="odd:bg-white even:bg-gray-50 px-4 py-2">{item.id}</td>
            <td className=" odd:bg-white even:bg-gray-50 px-4 py-2">{item.Doc_num}</td>
            <td className=" odd:bg-white even:bg-gray-50 px-4 py-2">{item.Orden}</td>
               <td className=" odd:bg-white even:bg-gray-50 px-4 py-2">
{new Date(item.fecha).toLocaleDateString("es-EC", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "America/Guayaquil"
  })}
</td>
              <td className="odd:bg-white even:bg-gray-50 px-4 py-2">{item.Linea}</td>
               <td className="odd:bg-white even:bg-gray-50 px-4 py-2">{item.Codigo}</td>
                <td className="odd:bg-white even:bg-gray-50 px-4 py-2">{item.Descripcion}</td>
                 <td className="odd:bg-white even:bg-gray-50 px-4 py-2">{item.Lider}</td>
                 <td className="odd:bg-white even:bg-gray-50 px-4 py-2 truncate">{item.Cant_Entregada}</td>
                <td className="odd:bg-white even:bg-gray-50 px-4 py-2 ">  <UlCell item={item} /></td>{/* //  UL*/}
                
                 <td className="px-4 py-2">{item.merma} kg</td>
          </tr>
        ))}

    </tbody>
  </table>
</div>

    </div>
  );
}

export default UlDashboard;
