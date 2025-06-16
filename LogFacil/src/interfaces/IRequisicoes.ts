export interface IRequisicoes {
  id: number;
  dataHora: string;
  ur: string;
  numero: number;
  situacao: string;
  observacao: string;
  checked?: boolean;
}

export interface DadosDistribuicao {
  almoxarifeSelecionado: string | null;
  urgente: boolean;
  observacao: string;
  formaEntregaSelecionada: string | null;
}