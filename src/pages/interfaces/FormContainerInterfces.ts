export interface ComboboxOption {
  value: string
  label: string
}
export interface FormType {
    descricaoCampanha: string,
    dataInicio: Date | null,
    dataFim:Date | null,
    meta: number,
    valorReceberIndustria: number,
    valorPremicao: number,
    gatilhoVenda: string,
    gatilhoPositivacao:string,
    fabricantes :number[],
    linhaProduto: number[],
    painelCliente: string,
    painelProduct:string,    
    tipoApuracao: string,
    tipoPagamento: string,
    participantes: {
      todos: boolean,
      televendas: boolean,
      exclusivas:boolean
    } | null,
    tipoCalculo:string,
    observacao: string
}
       