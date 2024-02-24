<template>
  <div>Home Page</div>

  <p>Olá {{ useStore.me?.name }}</p>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/store/users';
import { onMounted } from 'vue';

const useStore = useUsersStore();

onMounted(() => {
  useStore.getMe();
});
</script>