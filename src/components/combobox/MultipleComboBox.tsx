
import { useState, useRef, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

export interface ComboboxOption {
  value: string
  label: string
}


interface MultipleComboBoxProps {
  options: ComboboxOption[]
  selected: ComboboxOption[]
  onChange: (items: ComboboxOption[]) => void
  placeholder?: string
  className?: string,
  classNameContainer?:string
}

export  function MultipleComboBox({
  options, 
  placeholder = "Selecione...",
  className = "",
  selected,
  onChange,
  classNameContainer = ""
}: MultipleComboBoxProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const containerRef = useRef<HTMLDivElement>(null)

    const filteredOptions = options.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.value.toLowerCase().includes(search.toLowerCase())
    )

  function setItemInYourList(newValue: ComboboxOption) {
    const exists = selected.find(item => item.value === newValue.value)

    if (!exists) {
      onChange([...selected, newValue])
    }
  }

  function removeItemInYourList(value: string) {
    const newList = selected.filter(item => item.label !== value)
    onChange(newList)
  }


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
    <div className={`${className}`}>
    <div className="flex text-white mb-2">
        <ul className="flex flex-wrap gap-1 max-w-full">
            {
              selected.map((i)=> (
                    <li className="group  min-w-0 relative bg-[#2F2C7E] py-1 px-3 rounded-xl text-xs max-w-36 truncate " key={i.value}>
                          {i.value} - {i.label}
                          <button 
                              className="ml-2 text-[#FF9B2D] opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-2 -right-1 text-xs bg-[#504DA7] rounded-3xl px-1 "
                              onClick={()=>removeItemInYourList(i.label)}
                              >
                              X
                          </button>
                      </li>
              ))             
            }        
        </ul>
        
    </div>
    <div ref={containerRef} className={`relative w-full border-[#cacaca]  border-solid border-2  rounded-xl text-[#9CA3AF]  px-4 py-2 ${""}`}>
      
      {/* Botão */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-white  rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-primary"
      >
        <span>
          { placeholder}
        </span>
        <ChevronsUpDown className="w-4 h-4 opacity-50" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg">
          
          {/* Input busca */}
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-sm  focus:outline-none"
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
                  setItemInYourList(item)
                  setOpen(false)
                  setSearch("")
                }}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 flex items-center justify-between"
              >
                {item.value +' - '+ item.label}
                {selected.some(s => s.value === item.value)&& (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  )
}