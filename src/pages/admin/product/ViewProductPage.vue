<template>
  <v-dialog v-model="dialog" persistent width="500">
    <template v-slot:default>
      <v-card>
        <template v-slot:title>
          Produto: {{ TITLE_COMPUTED.id }}
        </template>

        <v-divider class="mt-4 mb-2" />

        <v-card-text>
          <v-img :src="API_URL + form.image" class="mb-4" />
          <p>Nome: {{ form.name }}</p>
          <p>Descrição: {{ form.description }}</p>
          <p>Preço: {{ form.price }}</p>
          <p>Data de Validade: {{ form.expiration_date }}</p>
          <p>Categoria: {{ CATEGORY_NAME_COMPUTED }}</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn text="sair" @click="fecharDialog()" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch, computed } from 'vue';
import Product from '@/entities/Product';
import { API_URL } from "@/utils/constants";
import Category from '@/entities/Category';

const props = defineProps({
  product: {
    type: Product,
    required: true
  }
});

const dialog = ref(false);
let form = ref(new Product('', '', 0, '', null, new Category('')));
const emits = defineEmits(['reset-product-view']);
const emitirEventoDeResetProduct = () => emits('reset-product-view');

watch(
  props,
  () => {
    if (props.product?.id) {      
      dialog.value = true;
      form.value = props.product;
    }
  }
);

const TITLE_COMPUTED = computed(() => props.product ?? { id: '' });
const CATEGORY_NAME_COMPUTED = computed(() => props.product?.category?.name ?? '');

function fecharDialog() {
  dialog.value = false;
  // form.value = new Product('', '', 0, '', null, new Category(''), '');
  emitirEventoDeResetProduct();
}
</script>