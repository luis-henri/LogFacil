import type { IRequisicoes } from '../interfaces/IRequisicoes';

const API_BASE_URL = 'http://localhost:3000/api'; // A base do URL da sua API

// Função genérica para fazer pedidos fetch
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('user-token');
  const headers = new Headers({
    'Content-Type': 'application/json',
    ...options.headers,
  });

  // Adiciona o token de autorização se ele existir e a rota não for de autenticação
  if (token && !endpoint.includes('/auth/')) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ocorreu um erro na API');
  }

  // Se a resposta não tiver conteúdo (ex: status 204), retorna um objeto vazio
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json() as Promise<T>;
  } else {
    return {} as T;
  }
}

// Função para buscar as requisições (agora usa a função genérica)
export async function obterRequisicoes(): Promise<IRequisicoes[]> {
  return apiFetch<IRequisicoes[]>('/requisicoes');
}

// Funções para login e registro
export async function loginUsuario(credentials: object) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function registrarUsuario(userData: object) {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}