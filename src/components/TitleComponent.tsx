
interface TitleComponentProps{
    title: string,
    required?:boolean,
    type: 'UniqueTitle' |'TracerTitle'
}
export function TitleComponent({title, required = false, type}:TitleComponentProps){
    return (
        <div className="flex items-center gap-1 ">
            {
                type == 'TracerTitle' 
                    ?<div className="w-10 bg-[#cacaca] h-[1.5px]"></div>
                    : <div></div>
            }
            
            {
                required == false 
                    ? <h1 className="text-lg text-[#9CA3AF]">{title}</h1> 
                    : <h1 className="text-lg text-[#9CA3AF]">{title} <strong className="text-red-600">*</strong></h1> 
            }
            
        </div>
    )
}