import { IconContext } from 'react-icons'
import {FaBullhorn} from 'react-icons/fa'
import logo from '../assets/LOGO-SOLFARMA-FLAT-100.png'



interface HeaderBackGroundProps {
  children: React.ReactNode
}

export function HeaderBackGround({ children }: HeaderBackGroundProps){
    return (
        <header className="max-h-max flex flex-col bg-gradient-to-r from-[#2F2C7E] to-[#5550E4] w-full py-10 px-8 rounded-t-lg relative  overflow-hidden">        
            <img src={logo} alt="logo" className='absolute left-0 top-0  max-h-[180px] opacity-25 ' />
            <div className="relative z-10">
                {children}
            </div>
        </header>
    )
}
export function HeaderContainer(){
    return (

        <HeaderBackGround >
            <div className="flex justify-between">
                <div className="flex flex-col gap-3">
                    <h1>Registro de Campanha</h1>
                    <h3>Preencha os campos abaixo para registrar sua campanha</h3>
                </div>
                <div>
                    <div className='bg-[#504DA7] p-4 rounded-3xl'>
                        <IconContext.Provider value={{size: '2rem'}}>
                            <FaBullhorn  color='#FF9B2D'/>
                        </IconContext.Provider>
                    </div>
                </div>                
            </div>            
        </HeaderBackGround>
        
    )
}
