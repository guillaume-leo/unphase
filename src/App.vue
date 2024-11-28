<script setup>
import { provide, ref, watch } from "vue";
import { useParams } from "./composables/useParams";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

provide("useParams", useParams);

const pendingRequests = ref({});

watch(pendingRequests, (newVal) => console.log("newVal", newVal));

window.message = (event) => {
  // here is the data comming from supercollider
  const responseData = event;

  if (
    responseData &&
    responseData.id &&
    pendingRequests.value[responseData.id]
  ) {
    pendingRequests.value[responseData.id](responseData);

    delete pendingRequests.value[responseData.id];
  }
};

provide("pendingRequests", pendingRequests);
</script>

<template>
  <RouterLink to="/playground">Go to playground</RouterLink>
  <RouterLink to="/">Go to home</RouterLink>
  <router-view />
</template>
