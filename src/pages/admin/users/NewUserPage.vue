<template>
  <v-dialog 
    v-model="dialog"
    persistent
    width="500" 
  >
    <template v-slot:activator>
      <v-btn @click="dialog = true" color="primary" class="mx-1">
        Novo Usuário
        <v-icon icon="mdi-plus" />
      </v-btn>
    </template>

    <template v-slot:default>
      <v-card>
        <template v-slot:title>
          Novo Usuário
        </template>

        <v-divider class="mt-4 mb-2"/>

        
        <v-alert
          v-if="v$.$errors.length > 0"
          density="compact"
          type="error"
          title="Erros Encontrados"
          class="mx-4"
        >
          <ul v-for="error of v$.$errors" :key="error.$uid" >
            <li>{{ error.$message }}</li>
          </ul>
        </v-alert>

        <v-card-text>
          <v-text-field 
            v-model="form.name"
            label="Nome"
            variant="outlined"
          />

          <v-text-field 
            v-model="form.email"
            label="Email"
            variant="outlined"
          />

          <v-text-field 
            v-model="form.password"
            label="Senha"
            variant="outlined"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="sair" @click="fecharDialog()" />
          <v-btn text="salvar" @click="salvar()" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers, minLength } from '@vuelidate/validators';
import { useUsersStore } from '@/store/users';

const initialState = {
  name: '',
  email: '',
  password: ''
}
const dialog = ref(false);
const store = useUsersStore();
const form = ref(initialState);
const rules = {
  form: {
    name: { 
      required: helpers.withMessage('O campo nome é obrigatorio.', required) 
    },
    email: { 
      email: helpers.withMessage('O campo email é invalido', email), 
      required: helpers.withMessage('O campo email é obrigatorio.', required)  
    },
    password: { 
      required: helpers.withMessage('O campo senha é obrigatorio.', required),
      minLength: helpers.withMessage('O campo senha deve ter mais de 6 caracteres.', minLength(6))
    }
  }
}

function fecharDialog() {
  dialog.value = false;
  v$.value.$reset();
}

const v$ = useVuelidate(rules, {form});

function resetForm() {
  form.value.name = '';
  form.value.email = '';
  form.value.password = '';
  v$.value.$reset();
}

const emits = defineEmits(['atualizar-tela-inicial']);

const emitirEvento = () => {
  emits('atualizar-tela-inicial');
};

function salvar() {  
  v$.value.form.$touch();
    
  if (v$?.value.form.$invalid) return;
  
  store.store(form.value)
    .finally(() => {
      fecharDialog();
      resetForm();
      emitirEvento();
    })
}


</script>