<script setup>
import { provide } from "vue";
import { useParam } from "@/composables/useParam";

provide("useParam", useParam);
</script>

<template>
  <div class="row justify-between">
    <RouterLink to="/property">Property</RouterLink>
    <RouterLink to="/">Go to home</RouterLink>
  </div>
  <router-view />
</template>
