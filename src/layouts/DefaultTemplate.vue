<template>
  <!-- <div>
    <router-link :to="{ name: 'admin.home' }">Home</router-link>
    <router-link :to="{ name: 'admin.users' }">Users</router-link>
  </div>
  {{  t }} -->
  <div>
    <v-app-bar
      color="primary"
      prominent
    >
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  
      <v-toolbar-title>My files</v-toolbar-title>
  
      <v-spacer></v-spacer>
  
      <v-btn variant="text" icon="mdi-magnify"></v-btn>
  
      <v-btn variant="text" icon="mdi-filter"></v-btn>
  
      <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
    </v-app-bar>
    
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// import { userHasPermission } from "@/utils/helpers";
// const t = userHasPermission('admin.users');
import { ref } from "vue";
const drawer = ref(false);
</script>