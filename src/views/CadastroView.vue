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
          <input 
          type="text" 
          inputmode="numeric"
          v-model="cpf" 
          placeholder="CPF" 
          maxlength="14" 
          required 
          />
        </div>
        <div class="input-group">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Senha" required />
          <EyeIcon v-if="!showPassword" @click="togglePassword" class="icon clickable" />
          <EyeSlashIcon v-else @click="togglePassword" class="icon clickable" />
        </div>
        <div class="input-group" :class="{ 'has-error': passwordError }">
          <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="Confirme sua Senha" required />
          <EyeIcon v-if="!showConfirmPassword" @click="toggleConfirmPassword" class="icon clickable" />
          <EyeSlashIcon v-else @click="toggleConfirmPassword" class="icon clickable" />
        </div>
        <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
        <button type="submit" class="button-primary">Cadastrar</button>
        <div class="separator"></div>
        <button type="button" class="button-tertiary" @click="handleBackToLogin">Voltar para o Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

const router = useRouter();

const nome = ref('');
const email = ref('');
const cpf = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordError = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);

watch([password, confirmPassword], () => {
  passwordError.value = '';
});

watch(cpf, (newValue) => {
  const digits = newValue.replace(/\D/g, '');
  let maskedValue = digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  if (maskedValue.length > 14) {
    maskedValue = maskedValue.slice(0, 14);
  }
  cpf.value = maskedValue;
})

function togglePassword() {
  showPassword.value = !showPassword.value;
}
function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

function handleCadastro() {
  if (!nome.value || !email.value || !cpf.value || !password.value || !confirmPassword.value) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  if (password.value !== confirmPassword.value) {
    passwordError.value = 'As senhas não correspondem.';
    return;
  }
  passwordError.value = '';
  console.log('Tentativa de cadastro com:', { nome: nome.value, email: email.value, cpf: cpf.value });
  alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
  router.push({ name: 'Login' });
}

function handleBackToLogin() {
  router.push({ name: 'Login' });
}
</script>

<style scoped>
/* Os estilos permanecem os mesmos */
.cadastro-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; }
.cadastro-box { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); text-align: center; width: 100%; max-width: 400px; }
.cadastro-box h2 { margin-bottom: 20px; color: #555; font-weight: normal; }
.input-group { display: flex; align-items: center; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 0 8px; transition: border-color 0.2s; }
.input-group input { flex: 1; border: none; outline: none; padding: 10px; background: transparent; }
.icon { width: 20px; height: 20px; color: #666; }
.clickable { cursor: pointer; }
.button-primary { width: 100%; padding: 12px; background-color: #0056b3; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; }
.button-primary:hover { background-color: #004494; }
.separator { margin: 20px 0; }
.button-tertiary { width: 100%; padding: 12px; background-color: transparent; color: #0056b3; border: 1px solid #0056b3; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: 500; transition: background-color 0.2s, color 0.2s; }
.button-tertiary:hover { background-color: #e6f2ff; }
.input-group.has-error { border-color: #dc3545; }
.error-message { color: #dc3545; font-size: 0.9rem; margin-top: -10px; margin-bottom: 15px; text-align: left; }
</style>