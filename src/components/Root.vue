<template>
  <!-- <div class="row">
    <div class="grid col-6">
      <step class="col-auto" v-for="x in 64" :index="x" />
    </div>
    <step-inspector :step-index="selectedStep" />
  </div> -->

  <!-- <Param v-for="num in 16" :path="`matrix.step_${num}.pitch`">
    <unphase-input />
  </Param> -->
  <Param path="ui_layout">
    <unphase-view />
  </Param>

  <RouterLink to="/property">Property</RouterLink>
  <Param path="matrix.tracks.0.step_1.pitch">
    <UnphaseInput />
  </Param>
</template>

<script setup>
import StepInspector from "./StepInspector.vue";
import Step from "./Step.vue";
import { useGlobalStore } from "@/stores/global";
import { storeToRefs } from "pinia";
import { ref, computed, reactive } from "vue";
import Param from "@/components/Param.vue";
import UnphaseInput from "@/components/UnphaseInput.vue";
import UnphaseView from "@/components/UnphaseView.vue";

// const store = useGlobalStore();
// const { selectedStep, visibleParameters } = storeToRefs(store);
</script>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 5px;
}
</style>
