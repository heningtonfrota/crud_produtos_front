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
        
        <NewCategoryPage @atualizar-tela-inicial="carregarDados()" />
      </v-row>
    </template>
    
    <template #item.actions="{ item }">
      <v-icon class="mx-1" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon class="mx-1" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>

  <UpdateCategoryPage :category="categoryUpdate" @atualizar-tela-inicial="carregarDados()" @reset-Category="categoryUpdate = new Category('')"/>
</template>

<script setup lang="ts">
import Category from '@/entities/Category';
import { useCategoriesStore } from '@/store/categories';
import { onMounted } from 'vue';
import { ref } from 'vue';
import NewCategoryPage from './NewCategoryPage.vue';
import UpdateCategoryPage from './UpdateCategoryPage.vue';

const categoryUpdate = ref({} as Category);
const store = useCategoriesStore();
const loading = ref(false);
const items = ref([]);
const headers = ref([
  { title: 'ID', align: 'start', key: 'id' },
  { title: 'Nome', align: 'start', key: 'name' },
  { title: 'Ações', align: 'start', key: 'actions' },
]);

onMounted(() => {
  carregarDados();
});

function carregarDados() {  
  loading.value = true;
  store.getCategories();

  setTimeout(() => {
    items.value = store.categories as never[];
    loading.value = false;
  }, 1000);
}

function editItem (item: Category) {
  categoryUpdate.value = item;
}

function deleteItem (item: any) {
  const id = item.id;
  store.delete(id).finally(() => carregarDados());
}
</script>