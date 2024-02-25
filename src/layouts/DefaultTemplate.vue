<template>
  <v-layout>
    <v-app-bar
      color="primary"
      prominent
    >
      <v-app-bar-nav-icon variant="text" @click.stop="drawerLeft = !drawerLeft"></v-app-bar-nav-icon>
  
      <v-toolbar-title>{{ TITLE_APP_BAR }}</v-toolbar-title>

      <v-spacer></v-spacer>  

      <v-btn variant="text" icon="mdi-dots-vertical" @click.stop="drawerRigth = !drawerRigth" />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawerLeft"
      location="left"
      temporary
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in itemsLeft"
          :key="i"
          :value="item"
          color="primary"
          :to="{name: item.value}"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="drawerRigth"
      location="right"
      temporary
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in itemsRigth"
          :key="i"
          :value="item"
          color="primary"
          @click="logout()"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-main class="">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { NAME_TOKEN } from "@/utils/constants";
import { ref, computed } from "vue";
import { useRoute } from 'vue-router';
import routers from '@/router';

const drawerLeft = ref(false);
const itemsLeft = ref([
  { text: 'Usuários', value: 'admin.users', icon: 'mdi-account-group' },
  { text: 'Produtos', value: 'admin.product', icon: 'mdi-package-variant-closed' }
]);

const drawerRigth = ref(false);
const itemsRigth = ref([
  { text: 'Sair', value: '', icon: 'mdi-logout' }
])
const router = useRoute();
const TITLE_APP_BAR = computed(() => {
  return itemsLeft.value.filter(f => f.value === router.name)[0].text;
});

const logout = () => {
  localStorage.removeItem(NAME_TOKEN);
  routers.push({ name: 'auth' })
}
</script>