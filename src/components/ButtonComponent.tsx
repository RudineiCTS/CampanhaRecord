import {FaPaperPlane} from 'react-icons/fa'
interface ButtonComponentProps{
    title:string;
}
export function ButtonComponent(props:ButtonComponentProps){
    return (
        <div className=" bg-gradient-to-r from-blue-500 to-purple-600 w-full max-w-full justify-center items-center text-center hover:cursor-pointer px-2 py-4 rounded-xl flex">
            <div className='flex ml-auto'>
                <h1 className="text-lg">{props.title}</h1 >
            </div>
            <div className='flex ml-auto pr-12'>
                <FaPaperPlane size={18}/>
            </div>
        </div>
    )
}