<template>
  <div class="login-container">
    <div class="login-box">
      <img src="@/assets/logosvg.svg" alt="LogFacil Logo" class="logo" />
      <h2>Faça seu login</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input
          type="text"
          inputmode="numeric"          v-model="titulo"
          placeholder="Título Eleitoral" 
          maxlength="12"
          required
          />
          <UserCircleIcon class="icon" />
        </div>
        <div class="input-group">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Senha"
            required
          />
          <EyeIcon
            v-if="!showPassword"
            @click="togglePassword"
            class="icon clickable"
          />
          <EyeSlashIcon
            v-else
            @click="togglePassword"
            class="icon clickable"
          />
        </div>
        <button type="submit" class="button-primary">Entrar</button>
        
        <!-- NOVO: Separador visual -->
        <div class="separator">ou</div>

        <!-- NOVO: Botão para Criar Conta -->
        <button type="button" class="button-secondary" @click="handleCreateAccount">Criar Conta</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { EyeIcon, EyeSlashIcon, UserCircleIcon } from '@heroicons/vue/24/outline'

// Campos do formulário
const titulo = ref('')
const password = ref('')
const showPassword = ref(false)

//'watch' para formatar o Título Eleitoral
watch (titulo, (newValue) => {
  // 1. Remove qualquer caractere que não seja um número e limita a 12 caracteres
  const valorFormatado = newValue.replace(/\D/g, '').slice(0,12);
 
  // 2. Atualiza o valor do ref 'titulo' com o valor formatado
  //    No <script setup>, usamos .value para acessar/modificar o valor de um ref.
  titulo.value = valorFormatado;
})

// ⚡ Emissor de evento para o pai
const emit = defineEmits(['login-success', 'create-account'])

function togglePassword() {
  showPassword.value = !showPassword.value
}

function handleLogin() {
  if (titulo.value && password.value) {
    console.log('Login com:', titulo.value)
    emit('login-success') // avisa o App.vue!
  } else {
    alert('Por favor, preencha email e senha.')
  }
}

// NOVO: Função para o botão Criar Conta
function handleCreateAccount() {
  console.log('Navegando para a página de criação de conta...');
  emit('create-account'); // Avisa o componente pai para trocar de tela, por exemplo
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.logo {
  max-width: 150px;
  margin-bottom: 20px;
}

.login-box h2 {
  margin-bottom: 20px;
  color: #555;
  font-weight: normal;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 8px;
}

.input-group input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
}

.icon {
  width: 20px;
  height: 20px;
  color: #666;
}

.clickable {
  cursor: pointer;
}

.button-primary {
  width: 100%;
  padding: 12px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.button-primary:hover {
  background-color: #004494;
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  color: #aaa;
  margin: 20px 0; /* Espaçamento vertical */
  font-size: 0.9rem;
}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e0e0e0;
}

.separator:not(:empty)::before {
  margin-right: .5em;
}

.separator:not(:empty)::after {
  margin-left: .5em;
}

/* NOVO: Estilo do botão "Criar Conta" */
.button-secondary {
  width: 100%;
  padding: 12px;
  background-color: #7ec86b; /* Sua cor personalizada */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.button-secondary:hover {
  background-color: #64af54; /* Sua cor de hover personalizada */
}
</style>
