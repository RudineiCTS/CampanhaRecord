import { FaPaperPlane } from "react-icons/fa"

interface InputBaseProps extends React.InputHTMLAttributes<HTMLInputElement>{
    icon?:React.ReactNode,
    disableButton?:boolean
}

export function InputBase({icon,className = '',disableButton, ...props}: InputBaseProps){
    return (
        <div 
            className={`bg-white w-full border-[#cacaca] border-2 px-4 py-2 rounded-xl flex items-center gap-2 
                  ${disableButton ?   "pointer-events-none opacity-25" : "cursor-pointer"}`
                  }>
            {icon && (
                <div className="bg-slate-300 p-2 rounded-full">
                    {icon}    
                 </div>
            )}
            <input
                {...props}
                className={`bg-transparent w-full outline-none border-none text-[#616366] placeholder-[#9CA3AF] ${className}`}
            />
        </div>
    )
}

export function InputText (props: InputBaseProps){
    return <InputBase  type="text" {...props}/>
}

export function InputNumber(props:InputBaseProps){
    return <InputBase type="number" {...props}/>
}

export function InputFile(props:InputBaseProps){
    return (
        <InputBase
            type="file"
            icon={<FaPaperPlane />}   
            disableButton         
            {...props}
        />
    )
}
