
import type { IRequisicoes } from '../interfaces/IRequisicoes';

interface IRequisicaoAPI {
  id: string | number;
  dataHora: string;
  ur: string;
  numero: string | number;
  situacao: string;
  observacao: string;
}

async function obterDadosURL<T>(url: string): Promise<T> {
  const resposta = await fetch(url);
  if (!resposta.ok) {
    throw new Error(`Erro HTTP! status: ${resposta.status}`);
  }
  return resposta.json() as Promise<T>;
}

export async function obterCategoria(): Promise<IRequisicoes[]> {
  const requisicoesAPI = await obterDadosURL<IRequisicaoAPI[]>(
    'https://gist.githubusercontent.com/luis-henri/2c94b7bc985e0e2f105221c7b6f4a688/raw/55ac54a326cddf64633a757e9215ba2d458f3b44/requisicoeslogfacil.json'
  );

  return requisicoesAPI.map(req => ({
    ...req,
    id: typeof req.id === 'string' ? parseInt(req.id, 10) : req.id,
    numero: typeof req.numero === 'string' ? parseInt(req.numero, 10) : req.numero,
  }));
}
