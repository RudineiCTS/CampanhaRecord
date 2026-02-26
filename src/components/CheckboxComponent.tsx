interface CheckboxComponentProps extends React.InputHTMLAttributes<HTMLInputElement>{
    title:string,
    legend:string,
}
export function CheckboxComponent(props:CheckboxComponentProps){
    return (
        <div className="flex text-[#9CA3AF] text-center items-center gap-2 ">
            <input type="checkbox" id={props.title} {...props}/>
            <strong>{props.legend}</strong>
        </div>
    )
}