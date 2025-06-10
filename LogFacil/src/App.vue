<template>
  <div id="app">
    <TelaRequisicoes 
      :requisicoes="requisicoes"
      :loading="isLoading"
      @distribuir="handleDistribuicaoConfirmada"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TelaRequisicoes from './components/TelaRequisicoes.vue';
import { obterCategoria } from './http/index'; // Usando sua função de API
import type { IRequisicoes, DadosDistribuicao } from './interfaces/IRequisicoes'; // Usando sua interface

export default defineComponent({
  name: 'App',
  components: {
    TelaRequisicoes,
  },
  data() {
    return {
      requisicoes: [] as IRequisicoes[],
      isLoading: false as boolean,
    };
  },
  methods: {
    handleDistribuicaoConfirmada(payload: { ids: number[], dadosPopup: DadosDistribuicao }) {
      console.log('Distribuição confirmada no App.vue!');
      console.log('IDs a serem removidos:', payload.ids);
      console.log('Dados do Popup:', payload.dadosPopup);
      
      this.requisicoes = this.requisicoes.filter(
        req => !payload.ids.includes(req.id)
      );
    }
  },
  async created() {
    this.isLoading = true;
    try {
      this.requisicoes = await obterCategoria();
    } catch (error) {
      console.error("Falha ao buscar requisições:", error);
    } finally {
      this.isLoading = false;
    }
  }
});
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
}
#app {
  width: 100%;
  max-width: 1200px;
}
</style>