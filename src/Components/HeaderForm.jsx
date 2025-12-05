import React, { useEffect, useState } from "react";
import data from "../data.json";
import NumberFlow from "@number-flow/react";
import sku from "../sku.json";

import TablaParos from "./TablaParos";
export default function ElegantProductionForm() {
  const [cant_T,setCant_T]=useState("")
  const [cant_hr_T,setHr_T]=useState("")
  const [formData, setFormData] = useState({
    Codigo: "",
    Descripcion: "",
    Categoria: "",
    Linea: "",
    Velocidad_nominal: "",
    Orden: "",
    Lote: "",
    Turno: "",
    Lider: "",
    Cant_Teorica: "",
    Cant_Entregada: "",
    Hrs_Teoricas: "",
    Hrs_Produccion: "",
    merma: "",
    avs_averia: "",
    observaciones: "",
    paros: {},
  });
  const [loadingSKU, setLoadingSKU] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoadingSKU(true);
    // Actualiza el campo que se está escribiendo
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (e.target.value === "") {
      setLoadingSKU(false);
    }

    // Si el campo es "Codigo", buscamos el producto
    if (name === "Codigo") {
      const productoEncontrado = sku.find((p) => p.Codigo === value);

      if (productoEncontrado) {
        setFormData((prev) => ({
          ...prev,
          Codigo: productoEncontrado.Codigo,
          Descripcion: productoEncontrado.Descripcion,
          Categoria: productoEncontrado.Categoria,
          Velocidad_nominal: productoEncontrado.Velocidad_nominal,
        }));
      } else {
        // Opcional: limpiar solo los campos vinculados al producto
        setFormData((prev) => ({
          ...prev,
          Codigo: value,
          Descripcion: "",
          Categoria: "",
          Velocidad_nominal: "",
        }));
      }
    }


  };





const handleChangeHrsTeoricas=(e)=>{

      if (
        formData.Velocidad_nominal !== "" &&
        formData.Hrs_Teoricas !== "--Elige--"
      ) {

        setHr_T()

        const [hh, mm] = formData.Hrs_Teoricas.split(":").map(Number);
 
        
      
        setCant_T ( Number(formData.Velocidad_nominal) * Number(hh) );
      } else{
        setCant_T (0);
      }
    
}



  console.log(formData,cant_T);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulario enviado");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <form
        onSubmit={handleSubmit}
        autoComplete="Off"
        className="bg-white shadow-lg rounded-xl p-5 w-full max-w-5xl border border-gray-200"
      >
        <div className="flex justify-between ">
          <div className="flex gap-4 items-end">
            <label className=" text-gray-600 text-center font-medium mb-1">
              Doc N°
            </label>
            <input
              type="text"
              name="doc"
              value={"xxxx-xxxx-xxxx-x"}
              onChange={handleChange}
              className="w-40 border-b border-gray-300 px-4 py-2  rounded-none focus:outline-none  focus:ring-blue-500 transition duration-200 "
              readOnly
            />
          </div>
          <div className="flex  gap-4 items-end">
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="Día"
                className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Mes"
                className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Año"
                className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
        {/* Título */}
        <h2 className="text-3xl font-bold text-gray-700 mb-6 mt-12 text-center">
          Registro de Producción
        </h2>

        {/* Cabecera */}
        <div className="grid grid-cols-4 gap-4 mb-6 ">
          <div className="grid grid-cols-3 gap-2 col-span-3  ">
            <div className="">
              <label className="block text-gray-600 font-medium mb-1">
                SKU
              </label>
              <input
                type="text"
                name="Codigo"
                value={formData.Codigo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div className="col-span-2 relative">
              <label className="block text-gray-600 font-medium mb-1">
                Descripción
              </label>
              <input
                type="text"
                name="linea"
                disabled
                value={formData.Descripcion}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {loadingSKU && (
                <div className="absolute top-10 left-4 bg-white">
                  <div className="h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <div className="w-40">
              <label className="block text-gray-600 font-medium mb-1">
                Línea
              </label>
              <select
                value={formData.Linea}
                name="Linea"
                onChange={handleChange}
                className="w-fit px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">-- Elige --</option>
                {data.Helados.Lineas.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Orden
              </label>
              <input
                type="text"
                name="Orden"
                value={formData.Orden}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Lote
              </label>
              <input
                type="text"
                name="Lote"
                value={formData.Lote}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>

            <div>
              <div className="w-full">
                <label className="block text-gray-700 font-semibold mb-2">
                  Turno
                </label>
                <div className="relative">
                  <select
                    name="Turno"
                    value={formData.Turno}
                    onChange={handleChange}
                    className="w-full appearance-none bg-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  >
                    <option value="">-- Elige --</option>
                    {data.Helados.turnos.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {/* Ícono de flecha */}
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
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
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="w-full">
                <label className="block text-gray-700 font-semibold mb-2">
                  Líder
                </label>
                <div className="relative">
                  <select
                    value={formData.Lider}
                    onChange={handleChange}
                    name="Lider"
                    className="w-full appearance-none bg-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  >
                    <option value="">-- Elige --</option>
                    {data.Helados.lider.map((option, index) => (
                      <option key={index} value={option.Nombre}>
                        {option.Nombre}
                      </option>
                    ))}
                  </select>
                  {/* Ícono de flecha */}
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid row-span-2 mt-6">
            <div>
              <input
                type="text"
                name=""
                readOnly
                value={"Vel. Nominal (und/hr)"}
                className="w-full px-4 py-2 border border-gray-400 bg-gray-100 focus:outline-none  transition duration-200 text-center "
              />

              <input
                type="text"
                name="linea"
                readOnly
                value={formData.Velocidad_nominal}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-400  focus:outline-none  transition duration-200 outline-none text-xl text-center text-neutral-500"
              />
            </div>
          </div>
        </div>

        {/* Cantidades */}
        <div className="flex gap-4 flex-col lg:flex-row mb-6 h-full lg:divide-x divide-neutral-300 ">
          <div className="flex gap-4 ">
            <div className="flex flex-col gap-3 ">
              <div className="flex justify-between gap-3">
                <label className="block text-gray-600 font-medium mb-1 ">
                  Cant. Teórica
                </label>
                <input
                  type="text"
                  name="Cant_Teorica"
                  value={
                  cant_T
                 
                  }
                  disabled
                  onChange={handleChange}
                  className="max-w-40 px-4 py-2 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div className="flex justify-between gap-3">
                <label className="block text-gray-600 font-medium mb-1">
                  Cant. Entregada
                </label>
                <input
                  type="text"
                  name="Cant_Entregada"
                  value={formData.Cant_Entregada}
                  onChange={handleChange}
                  className="max-w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
              <div className="flex justify-between gap-3">
                <label className="block text-gray-600 font-medium mb-1">
                  Hrs Teórica
                </label>
                <div className="relative w-full max-w-40 ">
                  <select
                    name="Hrs_Teoricas"
                    value={formData.Hrs_Teoricas}
                    onChange={handleChangeHrsTeoricas}
                    className="w-full appearance-none bg-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  >
                    <option value="">-- Elige --</option>
                    {data.hrs_teoricas.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {/* Ícono de flecha */}
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
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
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-3">
                <label className="block text-gray-600 font-medium mb-1">
                  Hrs Producción
                </label>
                <input
                  type="text"
                  name="Hrs_Produccion"
                  value={formData.Hrs_Produccion}
                  onChange={handleChange}
                  className="max-w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
                />
              </div>
            </div>
            {/**Merma */}
            <div className="pr-3">
              <div className="flex justify-between gap-3">
                <label className="block text-gray-600 font-medium mb-1 ">
                  Merma(Kg)
                </label>
                <input
                  type="text"
                  name="merma"
                  value={formData.merma}
                  onChange={handleChange}
                  className="max-w-40 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col rounded-lg h-full ">
              <div className="  px-5 py-1  rounded-tl-lg rounded-tr-lg h-fit bg-gray-100 border border-gray-300   ">
                <p className="text-xl text-gray-600">
                  Utilización de Línea(UL):
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center gap-1 border  border-gray-300 rounded-br-lg rounded-bl-lg  ">
                <NumberFlow className="text-4xl" value={124} />
                <p className="text-2xl text-gray-600 "> %</p>
              </div>
            </div>
            <div className="flex flex-col  rounded-lg h-full ">
              <div className="  px-5 py-1  rounded-tl-lg rounded-tr-lg h-fit bg-gray-100 border border-gray-300   ">
                <p className="text-xl text-gray-600">Merma</p>
              </div>
              <div className="flex flex-1 items-center justify-center gap-1 border  border-gray-300 rounded-br-lg rounded-bl-lg  ">
                <NumberFlow className="text-4xl" value={124} />
                <p className="text-2xl text-gray-600 "> %</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla Paros */}
        <div className="overflow-x-auto mb-6">
          <TablaParos></TablaParos>
        </div>

        {/* Aviso y Observaciones */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Aviso de Avería
          </label>
          <textarea
            name="avs_averia"
            onChange={handleChange}
            className="w-full h-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none p-1"
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Observaciones
          </label>
          <textarea
            name="observaciones"
            onChange={handleChange}
            className="w-full h-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none p-1"
          ></textarea>
        </div>

        {/* Checkbox */}
        <div className="flex items-center mb-6">
          <input type="checkbox" className="mr-2 focus:outline-none" />
          <span className="text-gray-600">
            Yo, __________________ garantizo que la información ingresada es
            fidedigna.
          </span>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-200 shadow"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
