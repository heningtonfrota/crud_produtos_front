<template>
  <div>
    <h1>Login</h1>

    <form action="#" method="post" @submit.prevent="auth">
      <div v-if="error.active">
        <p>{{ error.message }}</p>
      </div>

      <input v-model="email" type="email" name="email" placeholder="Email">
      <input v-model="password" type="password" name="password" placeholder="Password">
      
      <button type="submit">
        <span v-if="loading">Carregando...</span>
        <span v-else>Enviar</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useUsersStore } from '@/store/users';
  import router from '@/router';

  const useStore = useUsersStore()
  const loading = ref(false);
  const email = ref('');
  const password = ref('');
  const error = reactive({
    message: '',
    status: 0,
    active: false
  })

  const auth = () => {
    loading.value = true;

    useStore.auth(email.value, password.value)
      .then(() => router.push({ name: 'admin.home' }))
      .catch(responseError => {        
        error.message = 'Falha na Autenticação';
        error.status = responseError.response.status;
        error.active = true;
        
        if (error.status === 422) error.message = 'Dados inválidos';
        if (error.status === 404) error.message = 'Usuário não encontrado';
      })
      .finally(() => loading.value = false);
  }
</script>