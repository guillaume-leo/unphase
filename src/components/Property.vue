<template>
  <div class="row">
    <q-option-group
      v-model="propModel"
      :options="propOpts"
      color="primary"
      inline
    />
  </div>
  {{ pitch }}
  <div class="row q-pa-md">
    <!-- <multi-slider
      v-for="(param, i) in params"
      v-model="param.value"
      :min="0"
      :max="127"
    /> -->
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
import { inject, ref, computed, unref } from "vue";
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

const pitch = useParam(computed(() => `matrix.step_1.${propModel.value}`));

const currentPage = ref(1);

// const params = computed(() => {
//   const start = (currentPage.value - 1) * 16;
//   const end = currentPage.value * 16;
//   return Array.from({ length: end - start }, (_, i) =>
//     unref(useParam(`matrix.step_${start + i + 1}.${propModel.value}`))
//   );
// });
</script>
