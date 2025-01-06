<script setup>
import { provide, ref } from "vue";
import { useParam } from "./composables/useParam";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

// SHARED COMPOSABLES AND REFERENCES

const pendingRequests = ref({});
provide("pendingRequests", pendingRequests);
const visibleParameters = ref({});
provide("visibleParameters", visibleParameters);
const selectedStep = ref(1);
provide("selectedStep", selectedStep);
provide("useParam", useParam);

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
  if (obj.key in visibleParameters.value)
    visibleParameters.value[obj.key] = obj.value;
};
</script>

<template>
  <div class="row justify-between">
    <RouterLink to="/property">Property</RouterLink>
    <RouterLink to="/">Go to home</RouterLink>
  </div>
  <router-view />
</template>
