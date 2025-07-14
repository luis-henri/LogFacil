<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Faça seu login</h2>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input type="text" inputmode="numeric" v-model="cpf" placeholder="CPF" maxlength="14" required />
          <UserCircleIcon class="icon" />
        </div>
        <div class="input-group">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Senha" required />
          <EyeIcon v-if="!showPassword" @click="togglePassword" class="icon clickable" />
          <EyeSlashIcon v-else @click="togglePassword" class="icon clickable" />
        </div>
        <button type="submit" class="button-primary" :disabled="isLoading">
          {{ isLoading ? 'A entrar...' : 'Entrar' }}
        </button>
        <div class="separator">ou</div>
        <button type="button" class="button-secondary" @click="handleCreateAccount">Criar Conta</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import { EyeIcon, EyeSlashIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import { loginUsuario } from '../http'; // Importa a função da API

const router = useRouter();

const cpf = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

watch(cpf, (newValue) => {
  const digits = newValue.replace(/\D/g, '');
  let maskedValue = digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  if (maskedValue.length > 14) maskedValue = maskedValue.slice(0, 14);
  cpf.value = maskedValue;
});

function togglePassword() {
  showPassword.value = !showPassword.value
}

async function handleLogin() {
  if (!cpf.value || !password.value) {
    errorMessage.value = 'Por favor, preencha CPF e senha.';
    return;
  }
  isLoading.value = true;
  errorMessage.value = '';
  try {
    const response: any = await loginUsuario({ cpf: cpf.value.replace(/\D/g, ''), password: password.value });
    localStorage.setItem('user-token', response.token);
    router.push({ name: 'Requisicoes' });
  } catch (error: any) {
    errorMessage.value = error.message || 'Falha no login. Verifique as suas credenciais.';
  } finally {
    isLoading.value = false;
  }
}

function handleCreateAccount() {
  router.push({ name: 'Cadastro' });
}
</script>

<style scoped>
.login-container { display: flex; justify-content: center; align-items: center; min-height: 100vh; }
.login-box { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); text-align: center; width: 100%; max-width: 400px; }
.login-box h2 { margin-bottom: 20px; color: #555; font-weight: normal; }
.input-group { display: flex; align-items: center; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 4px; padding: 0 8px; }
.input-group input { flex: 1; border: none; outline: none; padding: 10px; background: transparent; }
.icon { width: 20px; height: 20px; color: #666; }
.clickable { cursor: pointer; }
.button-primary { width: 100%; padding: 12px; background-color: #0056b3; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; }
.button-primary:hover { background-color: #004494; }
.button-primary:disabled { background-color: #a0aec0; cursor: not-allowed; }
.separator { display: flex; align-items: center; text-align: center; color: #aaa; margin: 20px 0; font-size: 0.9rem; }
.separator::before, .separator::after { content: ''; flex: 1; border-bottom: 1px solid #e0e0e0; }
.separator:not(:empty)::before { margin-right: .5em; }
.separator:not(:empty)::after { margin-left: .5em; }
.button-secondary { width: 100%; padding: 12px; background-color: #7ec86b; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: 500; transition: background-color 0.2s; }
.button-secondary:hover { background-color: #64af54; }
.error-message { color: #dc3545; font-size: 0.9rem; margin-bottom: 15px; }
</style>