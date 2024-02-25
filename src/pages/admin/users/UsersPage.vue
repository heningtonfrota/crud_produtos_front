<template>
  <div>
    <v-data-table 
      :headers="headers" 
      :items="items" 
      item-value="key"
      height="calc(100vh - 170px)"
      density="comfortable"
      items-per-page="25"
      :loading="loading"
    >
      <template #top>
        <v-row class="ma-0 my-1">
          <h1 class="ml-2">Lista</h1>
          <v-divider vertical inset class="mx-2"/>
          <v-spacer />
          
          <NewUserPage @atualizar-tela-inicial="carregarDados()" />
        </v-row>
      </template>

      <template #item.actions="{ item }">
        <v-icon class="mx-1" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon class="mx-1" @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <UpdateUserPage :user="userUpdate" @atualizar-tela-inicial="carregarDados()" @reset-user="userUpdate = {}"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUsersStore } from '@/store/users';
import NewUserPage from './NewUserPage.vue';
import User from '@/entities/User';
import UpdateUserPage from './UpdateUserPage.vue';

const userUpdate = ref({});
const loading = ref(false);
const store = useUsersStore();
const items = ref([] as User[]);
const headers = [
  { title: 'ID', align: 'start', key: 'id' },
  { title: 'Nome', align: 'start', key: 'name' },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'Ações', align: 'start', key: 'actions' },
];

onMounted(() => {
  carregarDados();
});

function carregarDados() {  
  loading.value = true;
  store.getUsers();

  setTimeout(() => {
    items.value = store.users;
    loading.value = false;
  }, 1000);
}

const editItem = (item: object) => {
  userUpdate.value = item;
}

const deleteItem = (item: User) => {
  const { id } = item;
  store.delete(id).finally(() => carregarDados());
}

</script>