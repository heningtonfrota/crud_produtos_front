<template>
  <div>
    <h1>Lista</h1>
    <v-data-table-virtual 
      :headers="headers" 
      :items="items" 
      height="400" 
      item-value="key"
    ></v-data-table-virtual>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUsersStore } from '@/store/users';

const store = useUsersStore();
const t = computed(() => store.me);

const headers = ref([
  { title: 'ID', align: 'start', key: 'id' },
  { title: 'Nome', align: 'start', key: 'name' },
  { title: 'Descrição', align: 'start', key: 'description' },
  { title: 'Preço', align: 'start', key: 'price' },
  { title: 'Data de Expiração', align: 'start', key: 'expiration_date' },
]);

const items = ref([]);
</script>