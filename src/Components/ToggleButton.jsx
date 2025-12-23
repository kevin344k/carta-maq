
export default function ToggleButton({ open, onClick, label = "Ver detalle" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-label={label}
      className={
        "inline-flex items-center gap-2 rounded-md border border-gray-300 " +
        "px-2 py-1 text-sm font-medium " +
        (open ? "bg-blue-50 text-blue-700" : "bg-white text-gray-700") +
        " hover:bg-blue-100 hover:border-blue-400 transition-colors"
      }
    >
      <span
        className={
          "inline-flex h-5 w-5 items-center justify-center rounded-full " +
          (open ? "bg-blue-600 text-white" : "bg-gray-800 text-white")
        }
      >
        {open ? "−" : "+"}
      </span>
      <span className="hidden sm:inline">{open ? "Ocultar" : "Ver más"}</span>
    </button>
  );
}
