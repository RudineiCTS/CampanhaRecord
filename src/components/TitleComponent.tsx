
interface TitleComponentProps{
    title: string,
    required?:boolean,
    decoration: 'UniqueTitle' |'TracerTitle',
    type?: 'Title' | 'Legends' 
}
export function TitleComponent(props:TitleComponentProps ){
    return (
        <div  className="flex items-center gap-1 ">
            <h1 className={`${props.type ==="Title" ? "text-3xl" : "text-lg"} text-[#9CA3AF]`}>
                {props.title}
                {props.required &&  <strong className="text-red-600">*</strong>}
            </h1>
        </div>
    )
}
