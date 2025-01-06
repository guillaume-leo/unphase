<template>
  <div class="row">
    <q-option-group
      v-model="propModel"
      :options="propOpts"
      color="primary"
      inline
    />
  </div>
  <div class="row q-pa-md">
    <multi-slider
      v-for="(param, i) in params"
      v-model="param.value"
      :min="0"
      :max="127"
    />
  </div>
  <q-pagination
    v-model="currentPage"
    max="4"
    direction-links
    outline
    color="orange"
    active-design="unelevated"
    active-color="brown"
    active-text-color="orange"
  />
</template>

<script setup>
import { inject, ref, computed, watchEffect } from "vue";
import MultiSlider from "./slider/MultiSlider.vue";

const property = {
  PITCH: "pitch",
  VEL: "vel",
};

const propModel = ref(property.PITCH);
const propOpts = computed(() => [
  {
    label: property.PITCH,
    value: property.PITCH,
  },
  {
    label: property.VEL,
    value: property.VEL,
  },
]);

const useParam = inject("useParam");

const currentPage = ref(1);

// Array of params that will be populated reactively
const params = ref([]);

// Reactively watch changes to currentPage and propModel
watchEffect(() => {
  console.log(currentPage.value);

  const start = (currentPage.value - 1) * 16;
  const end = currentPage.value * 16;

  params.value = Array.from({ length: end - start }, (_, i) => {
    const keyRef = computed(
      () => `matrix.step_${start + i + 1}.${propModel.value}`
    );
    return useParam(keyRef);
  });
});
</script>
