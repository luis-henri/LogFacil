import type IRequisicoes from "@/interfaces/IRequisicoes";

async function obterDadosURL<T>(url: string) {
    const resposta = await fetch(url);
    return resposta.json() as T
}

export async function obterCategoria() {
    return obterDadosURL<IRequisicoes[]>('https://gist.githubusercontent.com/luis-henri/2c94b7bc985e0e2f105221c7b6f4a688/raw/6916f3e4c7de118cd3b65b273d58fa1e261c3421/requisicoeslogfacil.json')
}
