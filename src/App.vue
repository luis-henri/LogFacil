<template>
  <div id="app-container">
    <TelaLogin v-if="!isLoggedIn" @login-success="handleLogin" />

    <TelaRequisicoes 
      v-else
      :requisicoes="requisicoes"
      :loading="isLoading"
      @distribuir="handleDistribuicaoConfirmada"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TelaLogin from './components/TelaLogin.vue';
import TelaRequisicoes from './components/TelaRequisicoes.vue';
import { obterCategoria } from './http/index';
import type { IRequisicoes, DadosDistribuicao } from './interfaces/IRequisicoes';
import TelaCadastro from './components/TelaCadastro.vue';

export default defineComponent({
  name: 'App',
  components: {
    TelaLogin,
    TelaRequisicoes,
    TelaCadastro
  },
  data() {
    return {
      isLoggedIn: false as boolean,
      requisicoes: [] as IRequisicoes[],
      isLoading: false as boolean,
    };
  },
  methods: {
    handleLogin() {
      console.log('Login bem-sucedido! Carregando requisições...');
      this.isLoggedIn = true;
      this.carregarRequisicoes();
    },
    async carregarRequisicoes() {
      this.isLoading = true;
      try {
        const dadosApi = await obterCategoria();
        // Adiciona a propriedade 'checked' a cada requisição que vem da API
        this.requisicoes = dadosApi.map(req => ({ ...req, checked: false }));
      } catch (error) {
        console.error("Falha ao buscar requisições:", error);
      } finally {
        this.isLoading = false;
      }
    },
    handleDistribuicaoConfirmada(payload: { ids: number[], dadosPopup: DadosDistribuicao }) {
      console.log('Distribuição confirmada no App.vue!');
      console.log('IDs a serem removidos:', payload.ids);
      console.log('Dados do Popup:', payload.dadosPopup);
      
      this.requisicoes = this.requisicoes.filter(
        req => !payload.ids.includes(req.id)
      );
    }
  }
});
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
