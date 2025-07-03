<template>
  <div id="app-container">
    <!-- Renderização condicional baseada no estado -->
    <TelaLogin 
      v-if="currentView === 'login'" 
      @login-success="showRequisicoes" 
      @create-account="showCadastro"
    />
    <TelaCadastro 
      v-else-if="currentView === 'cadastro'"
      @cadastro-success="showLogin"
      @back-to-login="showLogin"
    />
    <TelaRequisicoes 
      v-else-if="currentView === 'requisicoes'"
      :requisicoes="requisicoes"
      :loading="isLoading"
      @distribuir="handleDistribuicaoConfirmada"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import TelaLogin from './components/TelaLogin.vue';
import TelaCadastro from './components/TelaCadastro.vue'; // Novo componente
import TelaRequisicoes from './components/TelaRequisicoes.vue';
import { obterCategoria } from './http/index';
import type { IRequisicoes, DadosDistribuicao } from './interfaces/IRequisicoes';

// --- ESTADO (State) ---
// Variável que controla qual "página" é mostrada.
const currentView = ref<'login' | 'cadastro' | 'requisicoes'>('login');
const requisicoes = ref<IRequisicoes[]>([]);
const isLoading = ref(false);

// --- AÇÕES (Actions) ---
async function carregarRequisicoes() {
  isLoading.value = true;
  try {
    const dadosApi = await obterCategoria();
    requisicoes.value = dadosApi.map(req => ({ ...req, checked: false }));
  } catch (error) {
    console.error("Falha ao buscar requisições:", error);
  } finally {
    isLoading.value = false;
  }
}

function handleDistribuicaoConfirmada(payload: { ids: number[], dadosPopup: DadosDistribuicao }) {
  console.log('Distribuição confirmada no App.vue!');
  console.log('IDs a serem removidos:', payload.ids);
  console.log('Dados do Popup:', payload.dadosPopup);
  
  requisicoes.value = requisicoes.value.filter(
    req => !payload.ids.includes(req.id)
  );
}

// --- NAVEGAÇÃO ---
function showRequisicoes() {
  console.log('Navegando para a tela de requisições...');
  currentView.value = 'requisicoes';
  carregarRequisicoes();
}

function showCadastro() {
  console.log('Navegando para a tela de cadastro...');
  currentView.value = 'cadastro';
}

function showLogin() {
  console.log('Voltando para a tela de login...');
  currentView.value = 'login';
}
</script>

<style>
/* Estilos globais para o corpo da página */
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
#app-container {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>