import { IconContext } from 'react-icons'
import {FaBullhorn} from 'react-icons/fa'
export function HeaderContainer(){
    return (
        <header className="max-h-max flex flex-col bg-gradient-to-r from-blue-500 to-purple-600 w-full py-10 px-8 rounded-t-lg">
            <div className="flex justify-between">
                <div className="flex flex-col gap-3">
                    <h1>Registro de Campanha</h1>
                    <h3>Preencha os campos abaixo para registrar sua campanha</h3>
                </div>
                <div>
                    <div className='bg-[#9C58EE] p-4 rounded-3xl'>
                        <IconContext.Provider value={{size: '2rem'}}>
                            <FaBullhorn />
                        </IconContext.Provider>
                    </div>
                </div>                
            </div>            
        </header>
    )
}