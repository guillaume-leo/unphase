<script setup>
import { provide, ref } from "vue";
import { useParams } from "./composables/useParams";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

// SHARED COMPOSABLES AND REFERENCES

provide("useParams", useParams);

const pendingRequests = ref({});
provide("pendingRequests", pendingRequests);
const visibleParameters = ref({});
provide("visibleParameters", visibleParameters);

// FUNCTIONS ACCESSIBLE FROM SC/VUE

window.processRequest = (event) => {
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

// should be use on the sc side for reactivity (dict key on change)
window.updateParam = (obj) => {
  Object.entries(obj, (key, value) => {
    console.log(key, value);
    visibleParameters.value[key] = value;
  });
};
</script>

<template>
  <div class="row justify-between">
    <RouterLink to="/playground">Go to playground</RouterLink>
    <RouterLink to="/">Go to home</RouterLink>
  </div>
  <pre>{{ visibleParameters }}</pre>
  <router-view />
</template>
