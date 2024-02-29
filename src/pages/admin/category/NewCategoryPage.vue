<template>
  <v-dialog v-model="dialog" persistent width="500">
    <template v-slot:activator>
      <v-btn @click="dialog = true" color="primary" class="mx-1">
        Nova Categoria
        <v-icon icon="mdi-plus" />
      </v-btn>
    </template>

    <template v-slot:default>
      <v-card>
        <template v-slot:title>
          Nova Categoria
        </template>

        <v-divider class="mt-4 mb-2" />


        <v-alert v-if="v$.$errors.length > 0" density="compact" type="error" title="Erros Encontrados" class="mx-4">
          <ul v-for="error of v$.$errors" :key="error.$uid">
            <li>{{ error.$message }}</li>
          </ul>
        </v-alert>

        <v-card-text>
          <v-text-field v-model="form.name" label="Nome" variant="outlined" />
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
import { required, helpers } from '@vuelidate/validators';
import { useCategoriesStore } from '@/store/categories';
import Category from '@/entities/Category';

const dialog = ref(false);
const store = useCategoriesStore();
const form = ref(new Category(''));

const rules = {
  form: {
    name: {
      required: helpers.withMessage('O campo nome é obrigatorio.', required)
    }
  }
}

function fecharDialog() {
  dialog.value = false;
  v$.value.$reset();
}

const v$ = useVuelidate(rules, { form });

function resetForm() {
  form.value = new Category('');
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