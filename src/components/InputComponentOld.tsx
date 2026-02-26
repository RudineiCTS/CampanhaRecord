import {FaPaperclip} from 'react-icons/fa'
interface InputComponentProps{
    placeholder?: string,
    type?: 'InputText' | 'InputNumber' | 'InputAnexoArquivo'  
}
export function InputComponent({placeholder,type = 'InputText'}:InputComponentProps){
    return (
        <>
            {
                type == 'InputText' 
                    ? (
                        <div className="bg-white text-[#9CA3AF]">
                            <input 
                                type="text" 
                                placeholder={placeholder}
                                className="bg-white w-full border-[#cacaca] border-solid border-2 px-4 py-2 rounded-xl"/>
                        </div>
                    ) : type =='InputAnexoArquivo'
                    ?
                    (
                         <div className="bg-white text-[#9CA3AF] flex flex-col gap-3 w-full">                            
                            <div className="flex items-center bg-white w-full border-[#cacaca] border-solid border-2 px-4 py-2 rounded-xl hover:cursor-pointer">                                
                                <div className='bg-slate-300 p-2 rounded-full'>
                                    <FaPaperclip/>
                                </div>
                                <input 
                                    type="file"                                 
                                    className="bg-transparent w-full  hover:cursor-pointer"/>
                            </div>
                        </div>
                    ) :
                    <></>
            }
        </>
    )
}