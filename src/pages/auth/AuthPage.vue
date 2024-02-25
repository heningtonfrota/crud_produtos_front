<template>
  <div>
    <v-card 
      class="mx-auto pa-12 pb-8" 
      elevation="8" 
      min-width="448" 
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">
        Email
      </div>

      <v-text-field 
        v-model="email"
        density="compact" 
        placeholder="Email" 
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      />

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Senha
      </div>

      <v-text-field 
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" 
        :type="visible ? 'text' : 'password'"
        density="compact" 
        placeholder="Senha" 
        prepend-inner-icon="mdi-lock-outline" 
        variant="outlined"
        @click:append-inner="visible = !visible"
      />

      <v-btn 
        block 
        class="mb-8" 
        color="blue" 
        size="large" 
        variant="tonal"
        @click="auth"
      >
        Entrar
        <v-icon icon="mdi-login" />
      </v-btn>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useUsersStore } from '@/store/users';
import router from '@/router';

const useStore = useUsersStore()
const loading = ref(false);
const visible = ref(false);
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
    .then(() => router.push({ name: 'admin.product' }))
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