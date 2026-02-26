interface TextAreaComponentProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{}
export function TextAreaComponent(props:TextAreaComponentProps){
    return (
        <div className="bg-white w-full border-[#cacaca] border-solid border-2 px-4 py-2 rounded-xl">
            <textarea rows={5} className="placeholder-[#9CA3AF] w-full border-none  text-[#616366]" placeholder="Observações da campanha..."  {...props}/>
        </div>
    )
}