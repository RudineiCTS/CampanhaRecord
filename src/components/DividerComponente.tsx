import React from "react";
import { motion } from "framer-motion";

interface ModernDividerProps{
    label:string,
    align:  'left' | 'center' | 'right',
    className:string
}

export default function ModernDivider({
  label,
  align = "center", // left | center | right
  className = "",
}: ModernDividerProps) {
  const alignment = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={`relative flex items-center w-full my-8 ${className}`}>
      {/* Left Line */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"
      />

      {label && (
        <div
          className={`absolute inset-0 flex ${alignment[align]} items-center pointer-events-none`}
        >
          <span className="px-4 py-1 text-sm font-medium text-gray-600 bg-white backdrop-blur-md rounded-full shadow-sm border border-gray-200">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
