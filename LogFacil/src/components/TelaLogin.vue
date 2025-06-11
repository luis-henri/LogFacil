<template>
  <div class="login-container">
    <div class="login-box">
      <img src="@/assets/logosvg.svg" alt="LogFacil Logo" class="logo">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="input-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="button-primary">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TelaLogin',
  emits: ['login-success'],
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      if (this.email && this.password) {
        console.log('Tentativa de login com:', this.email);
        this.$emit('login-success');
      } else {
        alert('Por favor, preencha email e senha.');
      }
    }
  }
});
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
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

.login-box h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.login-box h2 {
  margin-bottom: 20px;
  color: #555;
  font-weight: normal;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}
  
.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button.button-primary {
  width: 100%;
  padding: 12px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button.button-primary:hover {
  background-color: #004494;
}
</style>