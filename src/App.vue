<script setup>
import { provide } from "vue";
import { useParams } from "./composables/useParams";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

provide("useParams", useParams);
</script>

<template>
  <RouterLink to="/playground">Go to playground</RouterLink>
  <RouterLink to="/">Go to home</RouterLink>
  <router-view />
</template>
