import {FaPaperPlane} from 'react-icons/fa'
interface ButtonComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    title:string;
}
export function ButtonComponent({title, ...props}:ButtonComponentProps){
    return (
        <button 
            className=" bg-gradient-to-r from-[#2F2C7E] to-[#5550E4] w-full max-w-full justify-center items-center text-center hover:cursor-pointer px-2 py-4 rounded-xl flex"
            {...props} >
            <div className='flex ml-auto'>
                <h1 className="text-lg">{title}</h1 >
            </div>
            <div className='flex ml-auto pr-12'>
                <FaPaperPlane size={18} color='#FF9B2D'/>
            </div>
        </button>
    )
}