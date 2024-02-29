<template>
  <v-dialog v-model="dialog" persistent width="500">
    <template v-slot:activator>
      <v-btn @click="dialog = true" color="primary" class="mx-1">
        Novo Produto
        <v-icon icon="mdi-plus" />
      </v-btn>
    </template>

    <template v-slot:default>
      <v-card>
        <template v-slot:title>
          Novo Produto
        </template>

        <v-divider class="mt-4 mb-2" />


        <v-alert v-if="v$.$errors.length > 0" density="compact" type="error" title="Erros Encontrados" class="mx-4">
          <ul v-for="error of v$.$errors" :key="error.$uid">
            <li>{{ error.$message }}</li>
          </ul>
        </v-alert>

        <v-card-text>
          <v-text-field v-model="form.name" label="Nome" variant="outlined" />
          <v-text-field v-model="form.description" label="Descrição" variant="outlined" />
          <v-text-field v-model="form.price" label="Preço" variant="outlined" placeholder="Ex: 12.50 (decimal separado por ponto(.))"/>
          <v-text-field v-model="form.expiration_date" label="Data de Expiração" variant="outlined" placeholder="Ex: 2025-01-25"/>
          <v-file-input 
            v-model="form.image" 
            accept="image/png, image/jpeg, image/bmp" 
            label="Imagem" 
            variant="outlined" 
            :chips="false" 
            append-inner-icon="mdi-file" 
          />
          <SelectCategoriesComponent v-model:category="form.category_id" />
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
import { required, numeric, helpers } from '@vuelidate/validators';
import { useProductsStore } from '@/store/products';
import { useDate } from 'vuetify';
import Product from '@/entities/Product';
import SelectCategoriesComponent from "@/components/SelectCategoriesComponent.vue";

const dialog = ref(false);
const store = useProductsStore();
const form = ref(new Product('', '', 0, '', null));
const date = useDate();

const rules = {
  form: {
    name: {
      required: helpers.withMessage('O campo nome é obrigatorio.', required)
    },
    description: {
      required: helpers.withMessage('O campo descrição é obrigatorio.', required)
    },
    price: {
      numeric: helpers.withMessage('O campo preço deve conter apenas numeros .', numeric),
      required: helpers.withMessage('O campo preço é obrigatorio.', required)
    },
    expiration_date: {
      required: helpers.withMessage('O campo data de expiração é obrigatorio.', required),
      isDate: helpers.withMessage(
        'O campo data de expiração deve ser valido.', 
        (dateValidate: any) => date.isValid(dateValidate)
      ),
      isFuture: helpers.withMessage(
        'O campo data de expiração deve ser maior que a data atual.', 
        (dateValidate: any) => date.isBefore(new Date(), new Date(dateValidate))
      ),
    },
    category_id: {
      required: helpers.withMessage('O campo categoria é obrigatorio.', required)
    },
    image: {
      required: helpers.withMessage('O campo imagem é obrigatorio.', required)
    },
  }
}

function fecharDialog() {
  dialog.value = false;
  v$.value.$reset();
}

const v$ = useVuelidate(rules, { form });

function resetForm() {
  form.value = new Product('', '', 0, '', null);
  v$.value.$reset();
}

const emits = defineEmits(['atualizar-tela-inicial']);

const emitirEvento = () => {
  emits('atualizar-tela-inicial');
};

function salvar() {
  v$.value.form.$touch();

  if (v$?.value.form.$invalid) return;  

  
  const formData = new FormData();
  formData.append('name', form.value.name);
  formData.append('description', form.value.description);
  formData.append('price', form.value.price);
  formData.append('expiration_date', form.value.expiration_date);
  formData.append('image', form.value.image[0]);
  formData.append('category_id', form.value.category_id);  
  
  store.store(formData)
    .finally(() => {
      fecharDialog();
      resetForm();
      emitirEvento();
    })
}


</script>