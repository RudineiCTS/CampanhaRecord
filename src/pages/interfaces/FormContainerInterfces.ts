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
    FormaRecebimento:string,
    fabricantes :number[],
    linhaProduto: number[],
    painelCliente: boolean,
    arquivo: string,
    tipoApuracao: string,
    tipoPagamento: string,
    participantes: {
      todos: false,
      televendas: false,
      exclusivas:false
    } | null,
    observacao: string
}
       