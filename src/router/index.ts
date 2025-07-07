import { createRouter, createWebHistory } from 'vue-router';

// Função para verificar se o utilizador está autenticado (simulação)
const isAuthenticated = () => {
  return !!localStorage.getItem('user-token');
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login' // Redireciona a raiz para a página de login
    },
    {
      path: '/login',
      name: 'Login',
      // Lazy Loading: O componente só é carregado quando esta rota é visitada.
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/cadastro',
      name: 'Cadastro',
      component: () => import('../views/CadastroView.vue')
    },
    {
      path: '/requisicoes',
      name: 'Requisicoes',
      component: () => import('../views/RequisicoesView.vue'),
      meta: { requiresAuth: true } // Marca esta rota como protegida
    }
  ]
});

// Navigation Guard: Corre antes de cada mudança de rota.
router.beforeEach((to, from, next) => {
  // Verifica se a rota para a qual o utilizador está a ir requer autenticação
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // Se não estiver autenticado, redireciona para a página de login.
    next({ name: 'Login' });
  } else {
    // Se estiver tudo certo, permite a navegação.
    next();
  }
});

export default router;