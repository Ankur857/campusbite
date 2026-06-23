import { ArrowRight } from "lucide-react";

export default function PortalCard({
  icon,
  title,
  description,
  buttonText,
  color,
  extraIcon,
}) {
  const buttonColorClass = color.includes("amber") ? "text-orange-700" : "text-emerald-700";
  
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 w-full max-w-md hover:shadow-md transition relative overflow-hidden">
      {extraIcon && (
        <div className="absolute right-4 top-4">
          {extraIcon}
        </div>
      )}
      
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} relative z-10`}
      >
        {icon}
      </div>

      <h2 className="mt-5 text-xl font-bold text-gray-800 relative z-10">{title}</h2>

      <p className="mt-2 text-sm text-gray-500 leading-relaxed relative z-10">
        {description}
      </p>

      <button className={`mt-6 flex items-center gap-2 font-semibold text-sm ${buttonColorClass} hover:gap-3 transition-all relative z-10`}>
        {buttonText}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}