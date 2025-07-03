<script lang="ts" setup>
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';
import { ref, watch } from 'vue';

const nome = ref('');
const email = ref('');
const titulo = ref('');
const password = ref('');
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const confirmPassword = ref(''); // Novo ref
const passwordError = ref(''); // Novo ref para a mensagem de erro

//'watch' para formatar o Título Eleitoral
watch (titulo, (newValue) => {
  // 1. Remove qualquer caractere que não seja um número e limita a 12 caracteres
  const valorFormatado = newValue.replace(/\D/g, '').slice(0,12);
 
  // 2. Atualiza o valor do ref 'titulo' com o valor formatado
  //    No <script setup>, usamos .value para acessar/modificar o valor de um ref.
  titulo.value = valorFormatado;
})

// Observa mudanças nos campos de senha para limpar o erro
watch([password, confirmPassword], () => {
  passwordError.value = '';
});

const emit = defineEmits(['cadastro-success', 'back-to-login']);
// Funções para alternar a visibilidade de cada campo
function togglePassword() {
  showPassword.value = !showPassword.value;
}
function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

function handleCadastro() {
  if (nome.value && email.value && titulo.value && password.value) {
    console.log('Tentativa de cadastro com:', {
      nome: nome.value,
      email: email.value,
      titulo: titulo.value,
    });

  //1. Verifica se as senhas correspondem
  if (password.value !== confirmPassword.value) {
    passwordError.value = 'As senhas não correspondem.';
    return; // Interrompe a função
  }

  // Se tudo estiver correto, prossegue
  passwordError.value = ''; // Limpa qualquer erro anterior
  console.log('Tentativa de cadastro com:', {
    nome: nome.value,
    email: email.value,
    titulo: titulo.value,
  });

    // Numa aplicação real, você faria uma chamada à API para criar o usuário.
    alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
    emit('cadastro-success');
  } else {
    alert('Por favor, preencha todos os campos.');
  }
}

function handleBackToLogin() {
  emit('back-to-login');
}
</script>

<template>
  <div class="cadastro-container">
    <div class="cadastro-box">
      <h2>Criar Nova Conta</h2>
      <form @submit.prevent="handleCadastro">
        <div class="input-group">
          <input type="text" v-model="nome" placeholder="Nome Completo" required />
        </div>
        <div class="input-group">
          <input type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="input-group">
          <input type="text" v-model="titulo" placeholder="Título Eleitoral" maxlength="12" required />
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
        <div class="input-group" :class="{ 'has-error': passwordError }">
          <input 
          :type="showConfirmPassword ? 'text' : 'password'"
          v-model="confirmPassword" 
          placeholder="Confirme sua Senha" 
          required 
          />
          <EyeIcon
            v-if="!showConfirmPassword"
            @click="toggleConfirmPassword"
            class="icon clickable"
          />
          <EyeSlashIcon
          v-else
          @click="toggleConfirmPassword"
          class="icon clickable"
          />
        </div>
        <!-- MENSAGEM DE ERRO -->
        <p v-if="passwordError" class="error-message">{{ passwordError }}</p>

        <button type="submit" class="button-primary">Cadastrar</button>
        <div class="separator"></div>
        <button type="button" class="button-tertiary" @click="handleBackToLogin">Voltar para o Login</button>
      </form>
    </div>
  </div>
</template>

<style>
.cadastro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.cadastro-box {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}
.cadastro-box h2 {
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
  background: transparent;
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
  margin: 20px 0;
}
.button-tertiary {
  width: 100%;
  padding: 12px;
  background-color: transparent;
  color: #0056b3;
  border: 1px solid #0056b3;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s;
}
.button-tertiary:hover {
  background-color: #e6f2ff;
}
.input-group.has-error {
  border-color: #dc3545; /* Vermelho para a borda do campo */
}
.error-message {
  color: #dc3545; /* Vermelho para o texto da mensagem */
  font-size: 0.9rem;
  margin-top: -10px;
  margin-bottom: 15px;
  text-align: left;
}
.icon {
  width: 20px;
  height: 20px;
  color: #666;
}
.clickable{
  cursor: pointer;
}
</style>