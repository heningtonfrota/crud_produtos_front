<template>
  <div>
    <router-link :to="{ name: 'admin.home' }">Home</router-link>
    <router-link :to="{ name: 'admin.users' }">Users</router-link>
  </div>
  {{  t }}
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { userHasPermission } from "@/utils/helpers";
const t = userHasPermission('admin.users');
</script>