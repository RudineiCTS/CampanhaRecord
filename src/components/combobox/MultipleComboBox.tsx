
import { useState, useRef, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

export interface ComboboxOption {
  value: string
  label: string
}


interface MultipleComboBoxProps {
  options: ComboboxOption[]
  value: string | null
  onChange: (value: string) => void
  placeholder?: string
  className?: string  
}

export  function MultipleComboBox({
  options,
  value,  
  placeholder = "Selecione...",
  className = "",  
}: MultipleComboBoxProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const [itens, setItens] = useState<ComboboxOption[]>([]);
  const containerRef = useRef<HTMLDivElement>(null)

  const selected = itens.map((v) =>{       
        return v
    })

  const filteredOptions = options.filter((item) =>    
    {   
        
        return item.label.toLowerCase().includes(search.toLowerCase()) || item.value.toLowerCase().includes(search.toLowerCase())
    }
  )
function setItemInYourList(newValue:ComboboxOption){    
    const isExistValueInYourList = itens.find((item)=> item.value === newValue.value)

    if(!isExistValueInYourList){
        setItens((prev)=> [...prev, newValue])
        return;
    }
    return;
}
function removeItemInYourList(value:string){
    const takeValueInLabel = itens.find((i)=> i.label === value)
    console.log(selected)
    if(!takeValueInLabel){
        return;
    }
    const newListItem= itens.filter((v) => v.value !== takeValueInLabel.value);
    setItens(newListItem)
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
    <>
    <div className="flex text-white ">
        <ul className="flex flex-col gap-1">
            {
              selected.map((i)=> (
                    <li className="group  relative bg-[#2F2C7E] py-1 px-3 rounded-xl text-xs" key={i.value}>
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
    <div ref={containerRef} className={`relative w-full border-[#cacaca]  border-solid border-2  rounded-xl  px-4 py-2 ${className}`}>
      
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
                {value === item.value && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  )
}