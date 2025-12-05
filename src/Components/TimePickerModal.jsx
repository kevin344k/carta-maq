import React, { useState } from "react";

export default function TimePickerModal({ isOpen, onClose, onSave }) {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  if (!isOpen) return null;

  const handleSave = () => {
    const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    onSave(time);
    onClose();
  };

return (
  <div className="fixed inset-0 flex items-center justify-center z-50 ">
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/50  "></div>

    {/* Modal */}
    <div className="relative bg-white rounded-xl shadow-lg w-full max-w-sm p-6 z-50">
      <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
        Selecciona la duración
      </h2>

      {/* Vista previa */}
      <div className="text-center mb-6">
        <p className="text-4xl font-semibold text-blue-600">
          {String(hour).padStart(2, "0")}:{String(minute).padStart(2, "0")}
        </p>
      </div>

      {/* Carrusel Horas y Minutos */}
      <div className="flex justify-center gap-6">
        {/* Horas */}
        <div className="h-40 w-16 overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
          {Array.from({ length: 13 }, (_, i) => (
            <div
              key={i}
              onClick={() => setHour(i)}
              className={`snap-center text-center py-2 text-xl cursor-pointer ${
                hour === i ? "text-blue-600 font-bold" : "text-gray-500"
              }`}
            >
              {String(i).padStart(2, "0")}
            </div>
          ))}
        </div>

        {/* Minutos */}
        <div className="h-40 w-16 overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
          {Array.from({ length: 60 }, (_, i) => (
            <div
              key={i}
              onClick={() => setMinute(i)}
              className={`snap-center text-center py-2 text-xl cursor-pointer ${
                minute === i ? "text-blue-600 font-bold" : "text-gray-500"
              }`}
            >
              {String(i).padStart(2, "0")}
            </div>
          ))}
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onClose}
          type="button"
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 "
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
);
}