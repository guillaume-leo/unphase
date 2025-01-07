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
import StepInspector from "./StepInspector.vue";
import Step from "./Step.vue";
import { useGlobalStore } from "@/stores/global";
import { storeToRefs } from "pinia";

const store = useGlobalStore();
const { selectedStep } = storeToRefs(store);
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 5px;
}
</style>
