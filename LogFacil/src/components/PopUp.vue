<template>
  <div v-if="visible" class="popup-overlay" @click.self="handleOverlayClick">
    <div class="popup-content">
      <div class="popup-header">
        <h3>Distribuir Requisições</h3>
        <button @click="closePopup" class="close-button" aria-label="Fechar popup">&times;</button>
      </div>
      <div class="popup-body">
        <div class="form-section">
          <label class="section-label">Almoxarifes:</label>
          <div class="radio-group">
            <div v-for="almoxarife in almoxarifes" :key="almoxarife" class="radio-item">
              <input type="radio" :id="'almox-' + almoxarife" :value="almoxarife" v-model="formData.almoxarifeSelecionado">
              <label :for="'almox-' + almoxarife">{{ almoxarife }}</label>
            </div>
          </div>
        </div>

        <div class="form-section">
          <div class="checkbox-item">
            <input type="checkbox" id="urgente" v-model="formData.urgente">
            <label for="urgente">Urgente</label>
          </div>
        </div>

        <div class="form-section">
          <label for="observacao" class="section-label">Observação:</label>
          <textarea id="observacao" v-model="formData.observacao" rows="3" placeholder="Digite uma observação..."></textarea>
        </div>

        <div class="form-section">
          <label class="section-label">Forma de entrega:</label>
          <div class="radio-group">
            <div v-for="forma in formasEntrega" :key="forma" class="radio-item">
              <input type="radio" :id="'forma-' + forma" :value="forma" v-model="formData.formaEntregaSelecionada">
              <label :for="'forma-' + forma">{{ forma }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="popup-actions">
        <button @click="handleSubmit" class="button-primary">Confirmar</button>
        <button @click="closePopup" class="button-secondary">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { DadosDistribuicao } from '../interfaces/IRequisicoes';

export default defineComponent({
  name: 'PopUp',
  props: {
    visible: {
      type: Boolean,
      required: true,
    }
  },
  emits: ['close', 'submit'],
  data() {
    return {
      formData: {
        almoxarifeSelecionado: null,
        urgente: false,
        observacao: '',
        formaEntregaSelecionada: null,
      } as DadosDistribuicao,
      almoxarifes: ['Hugo', 'José', 'Leonardo', 'Janet', 'Lu'],
      formasEntrega: ['SETRANS', 'Correios', 'Portador'],
    };
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
    handleOverlayClick() {
      this.closePopup();
    },
    handleSubmit() {
      if (!this.formData.almoxarifeSelecionado) {
        alert('Por favor, selecione um almoxarife.');
        return;
      }
      if (!this.formData.formaEntregaSelecionada) {
        alert('Por favor, selecione uma forma de entrega.');
        return;
      }
      this.$emit('submit', { ...this.formData });
      this.closePopup();
    },
    resetForm() {
      this.formData = {
        almoxarifeSelecionado: null,
        urgente: false,
        observacao: '',
        formaEntregaSelecionada: null,
      };
    }
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        this.resetForm();
      }
    }
  }
});
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 15px;
}
.popup-content {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: fadeInScale 0.3s ease-out;
}
@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}
.popup-header h3 {
  margin: 0;
  font-size: 1.4em;
  color: #333;
}
.close-button {
  background: none;
  border: none;
  font-size: 1.8em;
  color: #888;
  cursor: pointer;
  padding: 0 5px;
}
.close-button:hover {
  color: #333;
}
.popup-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.section-label {
  font-weight: 600;
  color: #555;
  margin-bottom: 5px;
}
.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
.radio-item, .checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.radio-item input[type="radio"], .checkbox-item input[type="checkbox"] {
  cursor: pointer;
  width: 18px;
  height: 18px;
  accent-color: #007bff;
}
.radio-item label, .checkbox-item label {
  color: #444;
  cursor: pointer;
  font-size: 0.95em;
}
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 0.95em;
  resize: vertical;
}
textarea:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}
.popup-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  border-top: 1px solid #eee;
  padding-top: 20px;
  margin-top: 10px;
}
.button-primary, .button-secondary {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  transition: background-color 0.2s ease;
}
.button-primary {
  background-color: #007bff;
  color: white;
}
.button-primary:hover {
  background-color: #0056b3;
}
.button-secondary {
  background-color: #6c757d;
  color: white;
}
.button-secondary:hover {
  background-color: #545b62;
}
@media (max-width: 600px) {
  .popup-content { padding: 20px; gap: 15px; }
  .popup-header h3 { font-size: 1.2em; }
  .popup-actions { flex-direction: column; }
  .button-primary, .button-secondary { width: 100%; }
}
</style>