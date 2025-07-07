<template>
  <div class="requisitions-container">
    <div class="caption-container">
      <h2 class="container-title">Requisições</h2>
      <button
        @click="openDistribuirPopup"
        :disabled="!hasSelectedRequisitions"
        class="distribuir-button"
        title="Distribuir requisições selecionadas"
      >
        Distribuir
      </button>
    </div>
    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" v-model="allSelected" @change="toggleSelectAll" title="Selecionar todos" />
          </th>
          <th>Data/Hora</th>
          <th>UR</th>
          <th>Número</th>
          <th>Situação</th>
          <th>Observação</th>
        </tr>
      </thead>
      <tbody v-if="!loading">
        <tr v-for="req in requisicoes" :key="req.id" :class="{ 'row-checked': req.checked }" @click="toggleRowSelection(req)">
          <td>
            <input type="checkbox" v-model="req.checked" @click.stop />
          </td>
          <td>{{ req.dataHora }}</td>
          <td>{{ req.ur }}</td>
          <td>{{ req.numero }}</td>
          <td>
            <span :class="['status-badge', getStatusClass(req.situacao)]">
              {{ req.situacao }}
            </span>
          </td>
          <td>{{ req.observacao || '-' }}</td>
        </tr>
        <tr v-if="requisicoes.length === 0">
          <td colspan="6" class="no-data-message">Nenhuma requisição encontrada.</td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading" class="loading-message">Carregando requisições...</div>

    <PopUp
      :visible="showDistribuirPopup"
      @close="closeDistribuirPopup"
      @submit="handleDistribuirSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import PopUp from '../components/PopUp.vue';
import { obterCategoria } from '../http/index';
import type { IRequisicoes, DadosDistribuicao } from '../interfaces/IRequisicoes';

const requisicoes = ref<IRequisicoes[]>([]);
const loading = ref(false);
const showDistribuirPopup = ref(false);

// Lógica de busca de dados agora vive dentro do próprio componente.
onMounted(async () => {
  loading.value = true;
  try {
    const dadosApi = await obterCategoria();
    requisicoes.value = dadosApi.map(req => ({ ...req, checked: false }));
  } catch (error) {
    console.error("Falha ao buscar requisições:", error);
  } finally {
    loading.value = false;
  }
});

const selectedRequisitions = computed(() => requisicoes.value.filter(item => item.checked));
const hasSelectedRequisitions = computed(() => selectedRequisitions.value.length > 0);

const allSelected = computed({
  get: () => requisicoes.value.length > 0 && requisicoes.value.every(item => item.checked),
  set: (value: boolean) => {
    requisicoes.value.forEach(item => { item.checked = value; });
  }
});

function toggleSelectAll(event: Event) {
  const target = event.target as HTMLInputElement;
  requisicoes.value.forEach(item => { item.checked = target.checked; });
}

function toggleRowSelection(req: IRequisicoes) {
  req.checked = !req.checked;
}

function getStatusClass(situacao: string): string {
  if (!situacao) return '';
  return `status-${situacao.toLowerCase().replace(/\s+/g, '-')}`;
}

function openDistribuirPopup() {
  if (hasSelectedRequisitions.value) {
    showDistribuirPopup.value = true;
  } else {
    alert("Por favor, selecione pelo menos uma requisição para distribuir.");
  }
}

function closeDistribuirPopup() {
  showDistribuirPopup.value = false;
}

function handleDistribuirSubmit(popupData: DadosDistribuicao) {
  console.log('Dados do Popup para distribuição:', popupData);
  console.log('Requisições selecionadas:', selectedRequisitions.value);
  
  // Lógica para remover os itens distribuídos da lista
  const idsToRemove = selectedRequisitions.value.map(r => r.id);
  requisicoes.value = requisicoes.value.filter(req => !idsToRemove.includes(req.id));

  closeDistribuirPopup();
  alert('Requisições selecionadas foram enviadas para distribuição!');
}
</script>

<style scoped>
/* Os estilos permanecem os mesmos */
.requisitions-container { width: 100%; overflow-x: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); }
.caption-container { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.requisitions-container table { width: 100%; border-collapse: collapse; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 0.9rem; letter-spacing: 0.5px; }
.container-title { font-weight: bold; font-size: 1.5em; color: #333; text-align: left; margin: 0; }
.distribuir-button { padding: 8px 18px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 0.9rem; font-weight: 500; transition: background-color 0.2s ease; }
.distribuir-button:hover { background-color: #0056b3; }
.distribuir-button:disabled { background-color: #cccccc; color: #666666; cursor: not-allowed; }
.requisitions-container thead { background-color: #f8f9fa; }
.requisitions-container th, .requisitions-container td { border: 1px solid #e9ecef; padding: 12px 15px; text-align: left; vertical-align: middle; }
.requisitions-container th { font-weight: 600; color: #495057; text-transform: uppercase; font-size: 0.85rem; }
.requisitions-container th input[type="checkbox"], .requisitions-container td input[type="checkbox"] { cursor: pointer; width: 18px; height: 18px; accent-color: #007bff; vertical-align: middle; }
.requisitions-container tbody tr { cursor: pointer; }
.requisitions-container tbody tr:nth-of-type(even) { background-color: #fcfdff; }
.requisitions-container tbody tr:hover { background-color: #eef2f7; }
.requisitions-container .row-checked { background-color: #e6f2ff !important; }
.requisitions-container .status-badge { padding: 5px 10px; border-radius: 15px; font-size: 0.8em; font-weight: 500; color: #fff; text-transform: capitalize; min-width: 80px; text-align: center; display: inline-block; }
.requisitions-container .status-recebida { background-color: #28a745; }
.requisitions-container .status-em-análise, .requisitions-container .status-em-analise { background-color: #ffc107; color: #212529; }
.requisitions-container .status-aprovada { background-color: #007bff; }
.requisitions-container .status-cancelada { background-color: #dc3545; }
.requisitions-container .status-pendente { background-color: #6c757d; }
.no-data-message, .loading-message { text-align: center; padding: 20px; color: #6c757d; font-style: italic; }
</style>