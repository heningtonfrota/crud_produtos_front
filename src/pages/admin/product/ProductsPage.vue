<template>
  <v-data-table 
    :headers="headers" 
    :items="items" 
    height="calc(100vh - 170px)"
    density="comfortable"
    items-per-page="25"
    item-value="key"
    :loading="loading"
  >
    <template #top>
      <v-row class="ma-0 my-1">
        <h1 class="ml-2">Lista</h1>
        <v-divider vertical inset class="mx-2"/>
        <v-spacer />
        
        <NewProductPage @atualizar-tela-inicial="carregarDados()" />
      </v-row>
    </template>

    <template #item.price="{ value }">
      R$ {{ value }}
    </template>

    <template #item.category="{ value }">
      {{ value.name }}
    </template>
    
    <template #item.actions="{ item }">
      <v-icon class="mx-1" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon class="mx-1" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>

  <UpdateProductPage :product="productUpdate" @atualizar-tela-inicial="carregarDados()" @reset-product="productUpdate = {}"/>
</template>

<script setup lang="ts">
import Product from '@/entities/Product';
import { useProductsStore } from '@/store/products';
import { onMounted } from 'vue';
import { ref } from 'vue';
import NewProductPage from './NewProductPage.vue';
import UpdateProductPage from './UpdateProductPage.vue';

const productUpdate = ref({} as Product);
const store = useProductsStore();
const loading = ref(false);
const items = ref([]);
const headers = ref([
  { title: 'ID', align: 'start', key: 'id' },
  { title: 'Nome', align: 'start', key: 'name' },
  { title: 'Descrição', align: 'start', key: 'description' },
  { title: 'Preço', align: 'start', key: 'price' },
  { title: 'Data de Expiração', align: 'start', key: 'expiration_date' },
  { title: 'Categoria', align: 'start', key: 'category' },
  { title: 'Ações', align: 'start', key: 'actions' },
]);

onMounted(() => {
  carregarDados();
});

function carregarDados() {  
  loading.value = true;
  store.getProducts();

  setTimeout(() => {
    items.value = store.products as never[];
    loading.value = false;
  }, 1000);
}

function editItem (item: Product) {
  productUpdate.value = item;
}

function deleteItem (item: any) {
  const id = item.id;
  store.delete(id).finally(() => carregarDados());
}
</script>