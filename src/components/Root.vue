<template>
  <!-- <unphase-input param-key="a" label="pitch" /> -->
  <div class="row">
    <div class="grid col-6">
      <step class="col-auto" v-for="x in 64" :index="x" />
    </div>
    <step-inspector :step-index="selectedStep" />
  </div>
</template>
<script setup>
import { inject } from "vue";
import StepInspector from "./StepInspector.vue";
import Step from "./Step.vue";

const selectedStep = inject("selectedStep");
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 5px;
}
</style>
