<script lang="ts">
import { defineComponent } from 'vue';

interface DadosDistribuicao {
  almoxarifesSelecionados: string[];
  isUrgente: boolean;
  observacao: string;
  formaDeEntrega: string | null;
}

export default defineComponent({
  name: 'PopUp',
  
  // Define os eventos que este componente pode emitir
  emits: ['fechar', 'confirmar'],

  data() {
    return {
      // Dados de exemplo para os campos do formulário
      almoxarifesDisponiveis: ['Hugo', 'José', 'Leonardo', 'Janet', 'Lu'] as string[],
      formasDeEntrega: ['SETRANS', 'Correios', 'Portador'] as string[],
      
      // Estado interno para os campos do formulário
      dados: {
        almoxarifesSelecionados: [],
        isUrgente: false,
        observacao: '',
        formaDeEntrega: null,
      } as DadosDistribuicao,
    };
  },

  methods: {
    cancelar(): void {
      // Emite o evento 'fechar' para o componente pai
      this.$emit('fechar');
    },
    confirmar(): void {
      // Emite o evento 'confirmar' com os dados do formulário como payload
      this.$emit('confirmar', this.dados);
    },
  },
});
</script>


<template>
  <div class="popup-backdrop" @click.self="cancelar">
    <div class="popup-container">
      <header class="popup-header">
        <h2>Distribuir Requisições</h2>
        <button class="close-button" @click="cancelar">&times;</button>
      </header>
      <main class="popup-content">
        <div class="form-group">
          <label class="form-label">Almoxarifes</label>
          <div class="checkbox-group">
            <div v-for="almoxarife in almoxarifesDisponiveis" :key="almoxarife">
              <input type="checkbox" :id="almoxarife" :value="almoxarife" v-model="dados.almoxarifesSelecionados">
              <label :for="almoxarife">{{ almoxarife }}</label>
            </div>
          </div>
        </div>

        <div class="form-group">
          <div class="single-checkbox">
            <input type="checkbox" id="urgente" v-model="dados.isUrgente">
            <label for="urgente">Urgente</label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="observacao" class="form-label">Observação</label>
          <textarea id="observacao" v-model="dados.observacao" rows="3" class="form-textarea"></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Forma de entrega</label>
          <div class="radio-group">
            <div v-for="forma in formasDeEntrega" :key="forma">
              <input type="radio" :id="forma" :value="forma" v-model="dados.formaDeEntrega">
              <label :for="forma">{{ forma }}</label>
            </div>
          </div>
        </div>
      </main>
      <footer class="popup-footer">
        <button class="button-secondary" @click="cancelar">Cancelar</button>
        <button class="button-primary" @click="confirmar">Confirmar Distribuição</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.popup-backdrop {
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
}

.popup-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e9ecef;
}

.popup-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  color: #6c757d;
}

.popup-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group .form-label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #212529;
}

.checkbox-group, .radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-group > div, .radio-group > div, .single-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-family: inherit;
  resize: vertical;
}

.popup-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #e9ecef;
  background-color: #f9fafb;
}

.button-primary, .button-secondary {
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.button-primary {
  background-color: #3498db;
  color: white;
}
.button-primary:hover {
  background-color: #2980b9;
}

.button-secondary {
  background-color: #ecf0f1;
  color: #2c3e50;
  border: 1px solid #bdc3c7;
}
.button-secondary:hover {
  background-color: #e0e6e8;
}

/* Custom checkbox and radio styles */
input[type="checkbox"], input[type="radio"] {
  margin-right: 5px;
}
</style>