<script setup>
import Param from "@/components/Param.vue";

import { onMounted, ref } from "vue";
const count = ref(0);

onMounted(() => console.log("mounted"));
</script>

<template>
  <!-- <div class="row justify-between">
    <RouterLink to="/property">Property</RouterLink>
    <RouterLink to="/">Go to home</RouterLink>
  </div>
  <router-view /> -->

  <Param path="matrix.step_1.pitch" />
</template>
