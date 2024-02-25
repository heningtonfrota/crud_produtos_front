<template>
  <v-dialog 
    v-model="dialog"
    persistent
    width="500" 
  >
    <template v-slot:default>
      <v-card>
        <template v-slot:title>
          Editar Usuário: {{ TITLE_COMPUTED.id }}
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
import { ref, defineEmits, watch, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { useUsersStore } from '@/store/users';

const props = defineProps({
  user: Object
});

const dialog = ref(false);
const store = useUsersStore();
let form = ref({
  id: '' as string | undefined,
  name: '' as string | undefined,
  email: '' as string | undefined
});
const rules = {
  form: {
    name: { 
      required: helpers.withMessage('O campo nome é obrigatorio.', required) 
    },
    email: { 
      email: helpers.withMessage('O campo email é invalido', email), 
      required: helpers.withMessage('O campo email é obrigatorio.', required)  
    }
  }
}

watch(
  props,
  () => {    
    if (props.user?.id) dialog.value = true;    
    form.value.id = props.user?.id;
    form.value.name = props.user?.name;
    form.value.email = props.user?.email;
  }
);

const TITLE_COMPUTED = computed(() => props.user ?? {id:''});

function fecharDialog() {
  dialog.value = false;
  resetForm();
  emitirEventoDeResetUser();
}

const v$ = useVuelidate(rules, {form});

function resetForm() {
  form.value = {
    id: '',
    name: '',
    email: ''
  }
  v$.value.$reset();
}

const emits = defineEmits(['atualizar-tela-inicial', 'reset-user']);
const emitirEventoDeResetUser = () => emits('reset-user');
const emitirEventoDeAtualizarTela = () => {
  emits('atualizar-tela-inicial');
};

function salvar() {  
  v$.value.form.$touch();
    
  if (v$?.value.form.$invalid) return;  
  
  store.update(form)
    .finally(() => {
      fecharDialog();
      resetForm();
      emitirEventoDeAtualizarTela();
    })
}


</script>