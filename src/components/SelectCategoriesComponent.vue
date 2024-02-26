<template>
  <v-select
    v-model="category"
    label="Selecione a categoria"
    :items="itens"
    variant="outlined"
    item-value="id"
    item-title="name"
  ></v-select>
</template>

<script setup lang="ts">
import Category from '@/entities/Category.ts';
import { useCategoriesStore } from '@/store/categories';
import { onMounted } from 'vue';
import { ref } from 'vue';

const store = useCategoriesStore();
const category = defineModel('category', { required: true });
const itens = ref([] as Category[]);

onMounted(() => {
  store.getCategories();

  setTimeout(() => {
    itens.value = store.categories;
  }, 1000);
})
</script>
