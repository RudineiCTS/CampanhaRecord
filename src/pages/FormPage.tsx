import { useEffect, useState } from "react";
import { CheckboxComponent } from "../components/CheckboxComponent";
import ComboBoxComponent, { type ComboboxOption } from "../components/ComboBoxComponent";
import { InputFile, InputNumber, InputText } from "../components/InputComponent";
import { TitleComponent } from "../components/TitleComponent";
import {Datepicker} from 'flowbite-react'
import { TextAreaComponent } from "../components/TextAreaComponent";
import { ButtonComponent } from "../components/ButtonComponent";
import type { FormType } from "./interfaces/FormContainerInterfces";
import ModernDivider from "@/components/DividerComponente";
import { MultipleComboBox } from "@/components/combobox/MultipleComboBox";
import fabricantes  from '../utils/fabricantes.json'

type IFabricante = {
  idfabricante: number
  nome: string
}


 
const tipoCampanhas = [
    {value: 'v', label:'Vendas'},
    {value: 'p', label:' Positivação'},
    {value: 'pv', label:'Produto Vendido'},
    {value: 'o', label:'Outro'}
]  as ComboboxOption[]
const tipoPagamentos = [
    {value:'cc', label:'Conta corrente fornecedor'},
    {value:'voucher', label:'Voucher para compra em site'},
    {value:'cpresente', label:'Cartão presente Industria'},
    {value:'sip', label:'SIP - Abatimento em Boleto'},
] as ComboboxOption[]
const tipoCalculo = [
    {value:'ranking', label:'Ranking'},
    {value:'valorPositivacaoQuantidade', label:'Valor por positivação ou quantidade'},
    {value:'faixaPremio', label:'Faixa de premio'},
    {value:'percSobreRealizado', label:'Percentual sobre o realizado'},
    {value:'premioProduto', label:'Premiação em produtos ou serviços'},
    {value:'outro', label:'Outros'},
] as ComboboxOption[]
export function FormContainer(){    
    const today = new Date();
    const currentDateInitialMonth = new Date(today.getFullYear(), today.getMonth(),1)
    const currentDateFinalMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    const [form, setForm] = useState<FormType>({
        descricaoCampanha:'',
        dataInicio: null,
        dataFim: null,
        meta:0,
        valorReceberIndustria:0,
        valorPremicao:0,
        gatilhoVenda:'',
        gatilhoPositivacao:'',
        fabricantes : [] as number[],
        linhaProduto: [] as number[],
        painelCliente: '',
        painelProduct: '',
        tipoApuracao:'',
        tipoPagamento:'',
        participantes: {todos:false, exclusivas:false, televendas:false},
        observacao: '',
        tipoCalculo:''
    })
    const [fabricantesSelecionados, setFabricantesSelecionados] = useState<ComboboxOption[]>([])
    const [hasPanelClient, setHasPanelClient] = useState<boolean>(false)
    const [notHasPanelClient, setnotHasPanelClient] = useState<boolean>(true)
    const [hasPanelProduct, setHasPanelProduct] = useState(false)    

    const options: ComboboxOption[] = (fabricantes as IFabricante[]).map((item) => ({
        value: String(item.idfabricante),
        label: item.nome
        }))

    function HandleChangeValueForm<K extends keyof FormType>( field: K, value: FormType[K]){        
        if( field ==='linhaProduto'){
            if(value === null){
                return;
            }
            let strgValue = value.toString();
            const arr = strgValue
                .split(",")
                .map((item) => Number(item));

            setForm((prev) =>({
                ...prev,
                [field]: arr
            }));
            return;
        }
        setForm((prev) =>({
            ...prev,
            [field]: value
        }));
        return;
    }
    function HandleValueCheckBox(e: React.ChangeEvent<HTMLInputElement>){
        const key = e.target.id as keyof FormType["participantes"]

        setForm((prev) => {
            return {
            ...prev,
            participantes: {
                ...prev.participantes,
                [key]: e.target.checked
            }
            } as FormType
        })
    }
    function HandleHasPanelClient(e: React.ChangeEvent<HTMLInputElement>){
        setHasPanelClient(e.target.checked);
        setnotHasPanelClient(!notHasPanelClient)
    }
    function HandleNotHasPanelClient(e: React.ChangeEvent<HTMLInputElement>){
        setnotHasPanelClient(e.target.checked);
        setHasPanelClient(!hasPanelClient)
    }
    function HandleHasPanelProduct(e: React.ChangeEvent<HTMLInputElement>){
        setHasPanelProduct(e.target.checked)
    }
    function HandleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(form)
    }
    function HandleValuesIdsFrabricantes(e:ComboboxOption[]){
        setFabricantesSelecionados(e)
        const listIdFabricantes = e.map((v)=> Number(v.value))
          setForm((prev)=>({
            ...prev,
            fabricantes: listIdFabricantes
        }))
    }
    function HandleDateApuration(dateValue: Date| null, label:string){
        if(dateValue){
            return;
        }
        if(label === "dtInicio"){
            setForm((prev)=>({
                ...prev,
                dataInicio: dateValue
            }))
        }        
        else{
            setForm((prev)=>({
                ...prev,
                dataFim: dateValue
            }))
        }
    }

    useEffect(()=>{
        
    },[])
    return (
        <form className="bg-white p-8 flex flex-col gap-5" onSubmit={HandleSubmit}>
            {/* nome campanha */}
            <div className="flex flex-col gap-5">
                <TitleComponent title='Descrição Campanha' decoration="TracerTitle" type="Title"/>
                <TitleComponent title='Nome Campanha:'required={true} decoration="UniqueTitle"/>
                <InputText 
                    placeholder="Ex: Kimberly Positivação" 
                    onChange={(e)=> HandleChangeValueForm("descricaoCampanha", e.target.value)}
                    value={form.descricaoCampanha}
                    />
                     

            </div>
            {/* periodo apuracao e meta */}
            <div className=" flex flex-col gap-8">
                <div className="bg-white flex items-center justify-between">                
                    <div className="flex gap-20 w-4/6">
                        <div className="flex flex-col gap-3">
                            <TitleComponent title="Data Inicio" required={true} decoration="UniqueTitle"/>
                            <Datepicker 
                                language="pt-BR" 
                                label="dtInicio" 
                                showClearButton={false}
                                showTodayButton={false}
                                onChange={(e) => HandleDateApuration(e, 'dtInicio')}      
                                key={'dataInicio'}   
                                value={form.dataInicio ?? currentDateInitialMonth}                                                                                                       
                                />
                        </div>                
                        <div className="flex flex-col  gap-3">
                            <TitleComponent title="Data Fim" required={true} decoration="UniqueTitle"/>
                            <Datepicker 
                                language="pt-BR" 
                                label="dtFim" 
                                showClearButton={false}
                                showTodayButton={false}
                                onChange={(e) => HandleDateApuration(e, 'dtFim')}      
                                key={'dtFim'}     
                                value={form.dataFim ?? currentDateFinalMonth}                                                                                                  
                                />
                        </div>   
                    </div>
                    <div className="flex flex-1 flex-col gap-4">
                        <TitleComponent title="Meta" decoration="UniqueTitle"/>                    
                        <InputNumber 
                            placeholder="Ex: 2000000.00" 
                            onChange={(e)=> HandleChangeValueForm("meta", Number(e.target.value))}
                            value={form.meta}
                            
                            />                    
                    </div>                            
                </div>
                <div className="flex  justify-between">
                    <div className="flex gap-16 w-4/6">
                        <div className="flex flex-col gap-3">
                            <TitleComponent title='Valor a receber da indústria:' decoration="UniqueTitle"/>
                            <InputNumber 
                                placeholder="Ex: 3000.00" 
                                onChange={(e)=> HandleChangeValueForm("valorReceberIndustria", Number(e.target.value))}
                                value={form.valorReceberIndustria}
                                />
                        </div>
                        <div className="flex flex-col gap-3">
                            <TitleComponent title='Valor para Premiação:' decoration="UniqueTitle"/>
                            <InputNumber 
                                placeholder="Ex: 3000.00" 
                                onChange={(e)=> HandleChangeValueForm("valorPremicao", Number(e.target.value))}
                                value={form.valorPremicao}
                                />
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-3">
                        <TitleComponent title='Tipo de Calculo para premio:' decoration="UniqueTitle"/>
                        <ComboBoxComponent 
                            onChange={(e)=> HandleChangeValueForm("tipoCalculo", e)}
                            options={tipoCalculo}
                            value={form.tipoCalculo}
                            className="text-[#9CA3AF]"                            
                        />
                    </div>
                </div>
            </div>
            <ModernDivider align="left" label="" className="" />
            {/* variaveis campanha */}
            <div className="flex flex-col gap-8 ">
                <TitleComponent title='Variaveis da Campanha' decoration="TracerTitle" type="Title"/>                
                    <div className="flex">
                        <div className="flex flex-col gap-3 flex-auto max-w-[70%] w-full">
                            <TitleComponent title='Fabricante:'  decoration="UniqueTitle"/>
                            <MultipleComboBox 
                                 options={options}
                                selected={fabricantesSelecionados}
                                onChange={(items) => {
                                    HandleValuesIdsFrabricantes(items)
                                }}
                                placeholder="Selecione o fabricante"
                                className="w-4/5 flex- flex-wrap"
                                />
                            {/* <InputText 
                                placeholder="516, 1218, 478 ..." 
                                onChange={(e)=> HandleChangeValueForm("fabricantes", e.target.value as any)}                                
                                />         */}
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                            <TitleComponent title='Linha Produto:'  decoration="UniqueTitle"/>
                            <InputText placeholder="1, 3..." onChange={(e)=> HandleChangeValueForm("linhaProduto", e.target.value as any)}/>                        
                        </div>                                              
                    </div>  
                    <div className="flex items-center ">
                         <div className="flex flex-col gap-3 w-2/4">
                            <TitleComponent title='Grupo de Produto:'  decoration="UniqueTitle"/>
                            <InputText placeholder="1, 3..." onChange={(e)=> HandleChangeValueForm("linhaProduto", e.target.value as any)}/>                        
                        </div>                                            
                    </div>                    
                <div className="flex gap-16">
                    <div>
                        <TitleComponent title='Gatilho venda'  decoration="UniqueTitle"/>
                        <InputText placeholder="15.00" onChange={(e)=> HandleChangeValueForm("gatilhoVenda", e.target.value)}/> 
                    </div>
                    <div>
                        <TitleComponent title='Gatilho Positivação'  decoration="UniqueTitle"/>
                        <InputText placeholder="5 cnpjs"  onChange={(e)=> HandleChangeValueForm("gatilhoPositivacao", e.target.value)}/> 
                    </div>                    
                </div>
                <div className="flex flex-col gap-3 justify-between">
                    <TitleComponent title='Participantes da campanha:'  decoration="UniqueTitle"/>
                    <div className="flex gap-10">
                        <CheckboxComponent legend="Todos" title="todos"           onChange={HandleValueCheckBox} checked={form.participantes?.todos}/>
                        <CheckboxComponent legend="Televendas" title="televendas" onChange={HandleValueCheckBox} checked={form.participantes?.televendas}/>
                        <CheckboxComponent legend="Exclusivas" title="exclusivas" onChange={HandleValueCheckBox} checked={form.participantes?.exclusivas}/>
                    </div>
                </div>
                <div className="flex gap-16 w-full">
                    <div className="flex w-full gap-28">
                        <div className="flex flex-col gap-3 flex-1">
                            <TitleComponent title='Tipo Apuração:'  decoration="UniqueTitle"/>
                            <ComboBoxComponent 
                                key={'tipoApuracao'}
                                onChange={(e)=>{ HandleChangeValueForm("tipoApuracao", e as any)} }  
                                options={tipoCampanhas}
                                value={form.tipoApuracao} 
                                className="text-[#9CA3AF]"/>
                        </div>
                       <div className="flex flex-col gap-3 flex-1">

                            <TitleComponent title='Tipo Pagamento:'  decoration="UniqueTitle"/>
                            <ComboBoxComponent 
                                key={'tipoPagmaneto'}
                                onChange={(e)=>{ HandleChangeValueForm("tipoPagamento", e as any)} }  
                                options={tipoPagamentos}
                                value={form.tipoPagamento} 
                                className="text-[#9CA3AF]"/>                                      
                        </div>
                    </div>                     

                </div>
                <ModernDivider align="left" label="" className="" />                  
                 <div className="flex flex-col gap-9  ">   
                      <TitleComponent title='Arquivos de apoio' decoration="TracerTitle" type="Title"/>                    
                      <div className="flex flex-col gap-2">
                         <CheckboxComponent legend="Utilizar painel produto" title="panelProduto"  onChange={HandleHasPanelProduct} checked={hasPanelProduct}/>                             
                         <InputFile disableButton={!hasPanelProduct}/>

                     </div>      
                     <div className="flex flex-col  gap-2">
                         <div className="flex gap-10 ">
                             <CheckboxComponent 
                                legend="Utilizar painel Cliente" 
                                title="existsPanelClient" 
                                checked={hasPanelClient}
                                onChange={HandleHasPanelClient}
                                />
                             <CheckboxComponent 
                                legend="Não utilizar painel" 
                                title="notExistsPanelClient" 
                                checked={notHasPanelClient}
                                onChange={HandleNotHasPanelClient}
                                />
                         </div>
                         <InputFile disableButton={ hasPanelClient === true ? false : true} />
                     </div>                         
                 </div>
                <TextAreaComponent onChange={(e)=> HandleChangeValueForm("observacao", e.target.value)}/>
                <div className="flex w-2/3 mx-auto">
                    <ButtonComponent title="Enviar" type="submit"/>
                </div>
            </div>
        </form>
    )
}