<template>
  <div class="card-container">
    <div v-if="showNotification" class="notification-bar">
      {{ notificationMessage }}
    </div>

    <header class="card-header">
      <h1 class="title">Requisições</h1>
      <button 
        class="distribute-button"
        :disabled="isDistribuirDisabled"
        @click="abrirPopup"
      >
        Distribuir
      </button>
    </header>
    <div class="table-wrapper">
      <table class="requests-table">
        <thead>
          <tr>
            <th><input type="checkbox" @change="selecionarTodas" v-model="todasSelecionadas" /></th>
            <th>Data/Hora</th>
            <th>UR</th>
            <th>Número</th>
            <th>Situação</th>
            <th>Observação</th>
          </tr>
        </thead>
        <tbody v-if="!loading">
          <!-- CORREÇÃO AQUI: troquei 'categoria' por 'req' -->
          <tr 
            v-for="req in requisicoes" 
            :key="req.id" 
            :class="{ 'row-selected': requisicoesSelecionadasIds.includes(req.id) }"
          >
            <td><input type="checkbox" :value="req.id" v-model="requisicoesSelecionadasIds" /></td>
            <td>{{ req.dataHora }}</td>
            <td>{{ req.ur }}</td>
            <td>{{ req.numero }}</td>
            <td><span class="status-tag">{{ req.situacao }}</span></td>
            <td>{{ req.observacao }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading" class="state-message">Carregando requisições...</div>
      <div v-if="!loading && requisicoes.length === 0" class="state-message">Nenhuma requisição pendente.</div>
    </div>
  </div>

  <PopUp 
    v-if="mostrarPopup" 
    @fechar="fecharPopup"
    @confirmar="handleDistribuicao"
  />
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import PopUp from './PopUp.vue';
// CORREÇÃO: Importando os tipos do novo local
import type { IRequisicoes, DadosDistribuicao } from '../interfaces/IRequisicoes';

export default defineComponent({
  name: 'TelaRequisicoes',
  components: {
    PopUp,
  },
  props: {
    requisicoes: {
      type: Array as PropType<IRequisicoes[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['distribuir'],

  data() {
    return {
      requisicoesSelecionadasIds: [] as number[],
      mostrarPopup: false as boolean,
      todasSelecionadas: false as boolean,
      showNotification: false as boolean,
      notificationMessage: '' as string,
    };
  },

  computed: {
    isDistribuirDisabled(): boolean {
      return this.requisicoesSelecionadasIds.length === 0 || this.loading;
    },
  },

  methods: {
    abrirPopup(): void {
      this.mostrarPopup = true;
    },
    fecharPopup(): void {
      this.mostrarPopup = false;
    },
    handleDistribuicao(dadosDoPopup: DadosDistribuicao): void {
      this.$emit('distribuir', { 
        ids: this.requisicoesSelecionadasIds,
        dadosPopup: dadosDoPopup
      });

      this.fecharPopup();
      this.triggerNotification('Requisições distribuídas com sucesso!');
    },
    triggerNotification(message: string): void {
      this.notificationMessage = message;
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 3000);
    },
    selecionarTodas(): void {
      if (this.todasSelecionadas) {
        this.requisicoesSelecionadasIds = this.requisicoes.map(r => r.id);
      } else {
        this.requisicoesSelecionadasIds = [];
      }
    }
  },

  watch: {
    requisicoesSelecionadasIds() {
      if (this.requisicoes && this.requisicoes.length > 0) {
        this.todasSelecionadas = this.requisicoesSelecionadasIds.length === this.requisicoes.length;
      } else {
        this.todasSelecionadas = false;
      }
    },
    requisicoes() {
      this.requisicoesSelecionadasIds = [];
    }
  }
});
</script>
<style scoped>
.card-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #2c3e50;
  color: white;
}

.title {
  margin: 0;
  font-size: 1.5rem;
}

.distribute-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;
}

.distribute-button:hover {
  background-color: #2980b9;
}

.distribute-button:disabled {
  background-color: #bdc3c7;
  opacity: 0.7;
  cursor: not-allowed;
}

.table-wrapper {
  overflow-x: auto;
}

.requests-table {
  width: 100%;
  border-collapse: collapse;
}

.requests-table th,
.requests-table td {
  padding: 12px 24px;
  text-align: left;
  border-bottom: 1px solid #ecf0f1;
  transition: background-color 0.2s;
}

.requests-table th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #34495e;
}

.requests-table tbody tr:hover {
  background-color: #f5f7fa;
}

/* Estilos para a linha selecionada */
.requests-table tbody tr.row-selected {
  background-color: #eaf2f8; /* Um azul bem claro */
  font-weight: 500;
}

.requests-table tbody tr.row-selected:hover {
  background-color: #d4e6f1; /* Um azul um pouco mais escuro para o hover */
}

.status-tag {
    background-color: #eafaf1;
    color: #2ecc71;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 500;
}
</style>