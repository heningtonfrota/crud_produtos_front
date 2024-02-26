<template>
  <v-dialog v-model="dialog" persistent width="500">
    <template v-slot:default>
      <v-card>
        <template v-slot:title>
          Editar Produto: {{ TITLE_COMPUTED.id }}
        </template>

        <v-divider class="mt-4 mb-2" />

        <v-alert v-if="v$.$errors.length > 0" density="compact" type="error" title="Erros Encontrados" class="mx-4">
          <ul v-for="error of v$.$errors" :key="error.$uid">
            <li>{{ error.$message }}</li>
          </ul>
        </v-alert>

        <v-card-text>
          <v-text-field v-model="form.name" label="Nome" variant="outlined" />
          <v-text-field v-model="form.description" label="Nome" variant="outlined" />
          <v-text-field v-model="form.price" label="Nome" variant="outlined" />
          <v-text-field v-model="form.expiration_date" label="Nome" variant="outlined" />
          <SelectCategoriesComponent v-model:category="form.category_id" />
        </v-card-text>

        <v-card-actions>
          <v-spacer />

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
import { required, helpers } from '@vuelidate/validators';
import { useProductsStore } from '@/store/products.ts';
import Product from '@/entities/Product';
import SelectCategoriesComponent from '@/components/SelectCategoriesComponent.vue';

const props = defineProps({
  product: {
    type: Product,
    required: true
  }
});

const dialog = ref(false);
const store = useProductsStore();
let form = ref({} as Product);
const rules = {
  form: {
    name: {
      required: helpers.withMessage('O campo nome é obrigatorio.', required)
    },
  }
}

watch(
  props,
  () => {
    if (props.product?.id) dialog.value = true;
    form.value = props.product;
    form.value.category_id = props.product.category.id;
  }
);

const TITLE_COMPUTED = computed(() => props.product ?? { id: '' });

function fecharDialog() {
  dialog.value = false;
  resetForm();
  emitirEventoDeResetUser();
}

const v$ = useVuelidate(rules, { form });

function resetForm() {
  form.value = new Product('','', 0, '');
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