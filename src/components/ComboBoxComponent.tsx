"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

export interface ComboboxOption {
  value: string
  label: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value: string | null
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function ComboBoxComponent({
  options,
  value,
  onChange,
  placeholder = "Selecione...",
  className = "",
}: ComboboxProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const containerRef = useRef<HTMLDivElement>(null)

  const selected = options.find((item) => item.value === value)

  const filteredOptions = options.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  )

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      
      {/* Botão */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <span>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronsUpDown className="w-4 h-4 opacity-50" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          
          {/* Input busca */}
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-sm border-b border-gray-200 focus:outline-none"
          />

          {/* Lista */}
          <ul className="max-h-60 overflow-auto">
            {filteredOptions.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500">
                Nenhum resultado
              </li>
            )}

            {filteredOptions.map((item) => (
              <li
                key={item.value}
                onClick={() => {
                  onChange(item.value)
                  setOpen(false)
                  setSearch("")
                }}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center justify-between"
              >
                {item.label}
                {value === item.value && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}