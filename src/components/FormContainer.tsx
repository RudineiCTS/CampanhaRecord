import { useState } from "react";
import { CheckboxComponent } from "./CheckboxComponent";
import ComboBoxComponent from "./ComboBoxComponent";
import { InputComponent } from "./InputComponent";
import { TitleComponent } from "./TitleComponent";
import {Datepicker} from 'flowbite-react'
import { TextAreaComponent } from "./TextAreaComponent";
import { ButtonComponent } from "./ButtonComponent";

export interface ComboboxOption {
  value: string
  label: string
}

const itensComboBox = [
    {value: 'v', label:'Vendas'},
    {value: 'p', label:' Positivação'},
    {value: 'pv', label:'Produto Vendido'},
    {value: 'o', label:'Outro'}
]  as ComboboxOption[]
export function FormContainer(){
    const [apuration, setApuration] = useState('');
    const [form, setForm] = useState({
        descricaoCampanha:'',
        dataInicio: Date,
        dataFim:Date,
        meta:0,
        valorReceberIndustria:0,
        valorPremicao:0,
        FormaRecebimento:'',
        fabricantes : [] as number[],
        linhaProduto: [] as number[],
        painelCliente: Boolean,
        arquivo: '',
        tipoApuracao:'',
        tipoPagamento:'',
        participantes: [] as string[],
        observacao: ''
    })
    return (
        <main className="bg-white p-8 flex flex-col gap-5 ">
            {/* nome campanha */}
            <div className="flex flex-col gap-5">
                <TitleComponent title='Descrição Campanha' type="TracerTitle"/>
                <TitleComponent title='Nome Campanha:'required={true} type="UniqueTitle"/>
                <InputComponent placeholder="Kimberly"/>
            </div>
            {/* periodo apuracao e meta */}
            <div className=" flex flex-col gap-8">
                <div className="bg-white flex items-center justify-between">                
                    <div className="flex gap-20 w-4/6">
                        <div className="flex flex-col gap-3">
                            <TitleComponent title="Data Inicio" required={true} type="UniqueTitle"/>
                            <Datepicker 
                                language="pt-BR" 
                                label="Hoje" 
                                labelClearButton="Limpar"                                                                         
                                />
                        </div>                
                        <div className="flex flex-col  gap-3">
                            <TitleComponent title="Data Fim" required={true} type="UniqueTitle"/>
                            <Datepicker 
                                language="pt-BR" 
                                label="Hoje" 
                                labelClearButton="Limpar"                                                                         
                                />
                        </div>   
                    </div>
                    <div className="flex flex-1 flex-col gap-4">
                        <TitleComponent title="Meta" type="UniqueTitle"/>                    
                        <InputComponent placeholder="2000000.00"/>                    
                    </div>                            
                </div>
                <div className="flex  justify-between">
                    <div className="flex gap-16 w-4/6">
                        <div className="flex flex-col gap-3">
                            <TitleComponent title='Valor a receber da indústria:' type="UniqueTitle"/>
                            <InputComponent placeholder="3000.00"/>
                        </div>
                        <div className="flex flex-col gap-3">
                            <TitleComponent title='Valor para Premiação:' type="UniqueTitle"/>
                            <InputComponent placeholder="3000.00"/>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-3">
                        <TitleComponent title='Forma de Recebimento:' type="UniqueTitle"/>
                        <InputComponent placeholder="Conta Corrente"/>
                    </div>
                </div>
            </div>
            {/* variaveis campanha */}
            <div className="flex flex-col gap-8 mt-10">
                <TitleComponent title='Variaveis da Campanha' type="TracerTitle"/>                
                    <div className="flex gap-16">
                        <div className="flex flex-col gap-3 flex-auto">
                            <TitleComponent title='Fabricante(s):'  type="UniqueTitle"/>
                            <InputComponent placeholder="516, 1218, 478 ..."/>        
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                            <TitleComponent title='Linha(s) Produto:'  type="UniqueTitle"/>
                            <InputComponent placeholder="1, 3..."/>                        
                        </div>                         
                    </div>  
                    <div className="flex items-center gap-16 mt-9">                      
                        <div >
                            <CheckboxComponent legend="Painel Cliente" title="panelCliente"/>
                            <CheckboxComponent legend="Todos" title="panelCliente"/>
                        </div>  
                        <div className="flex w-2/5">
                            <InputComponent type="InputAnexoArquivo"/>
                        </div>
                    </div>
                <div className="flex gap-16">
                    <div>
                        <TitleComponent title='Gatilho venda'  type="UniqueTitle"/>
                        <InputComponent placeholder="15.00"/> 
                    </div>
                    <div>
                        <TitleComponent title='Gatilho Positivação'  type="UniqueTitle"/>
                        <InputComponent placeholder="5 cnpjs"/> 
                    </div>                    
                </div>
                <div className="flex gap-16">
                    <div className="flex flex-col gap-3 w-2/6">
                        <TitleComponent title='Tipo Apuração'  type="UniqueTitle"/>
                        <ComboBoxComponent 
                            onChange={()=>{} }  
                            options={itensComboBox}
                            value={apuration} 
                            className="text-[#9CA3AF]"/>
                        <TitleComponent title='Tipo Pagamento'  type="UniqueTitle"/>
                        <ComboBoxComponent 
                            onChange={()=>{} }  
                            options={itensComboBox}
                            value={apuration} 
                            className="text-[#9CA3AF]"/>                                      
                    </div>                     
                     <div className="flex flex-col gap-3 justify-between">
                        <TitleComponent title='Participantes'  type="UniqueTitle"/>
                        <CheckboxComponent legend="Todos" title="Todos"/>
                        <CheckboxComponent legend="Televendas" title="Televendas"/>
                        <CheckboxComponent legend="Exclusivas" title="Exclusivas"/>
                    </div>
                </div>
                <TextAreaComponent/>
                <div className="flex w-2/3 mx-auto">
                    <ButtonComponent title="Enviar"/>
                </div>
            </div>
        </main>
    )
}