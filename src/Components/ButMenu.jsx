import { useState } from "react";
import { Link } from "react-router-dom";

export default function ButMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-1 right-4 z-50 ">
      {/* Botón hamburguesa */}
  <button
  onClick={() => setOpen(!open)}
  className="relative w-12 h-12 rounded-full border border-neutral-100 bg-white flex justify-center items-center cursor-pointer transition-all duration-300 shadow-md"
>
  <span
    className={`absolute w-6 h-0.5 bg-neutral-500 transition-transform duration-300 ${
      open ? "rotate-45" : "-translate-y-2"
    }`}
    style={{ transformOrigin: "center" }}
  ></span>
  <span
    className={`absolute w-6 h-0.5 bg-neutral-500 transition-opacity duration-300 ${
      open ? "opacity-0" : "opacity-100"
    }`}
    style={{ transformOrigin: "center" }}
  ></span>
  <span
    className={`absolute w-6 h-0.5 bg-neutral-500 transition-transform duration-300 ${
      open ? "-rotate-45" : "translate-y-2"
    }`}
    style={{ transformOrigin: "center" }}
  ></span>
</button>


      {/* Menú desplegable */}
      <div
        className={`absolute top-14 right-0 bg-white shadow-lg rounded-md p-4 flex flex-col gap-2 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link
          to="/ul"
          className="text-gray-700 hover:text-blue-600 transition-colors"
          onClick={() => setOpen(false)}
        >
          Registro
        </Link>
        <Link
          to="/ul/view-ul"
          className="text-gray-700 hover:text-blue-600 transition-colors"
          onClick={() => setOpen(false)}
        >
         Historico UL
        </Link>
      </div>
    </div>
  );
}