<template>
  <div class="column">
    <unphase-input v-model="pitchArr" :selected="iCount" label="pitch" />
    <unphase-input v-model="velArr" :selected="iCount" label="vel" />
  </div>
</template>

<script setup>
import { inject, computed } from "vue";
import UnphaseInput from "./UnphaseInput.vue";
const props = defineProps({
  stepIndex: {
    type: Number,
    default: null,
  },
});
const useParam = inject("useParam");

const pitchArr = useParam(
  computed(() => `matrix.step_${props.stepIndex}.pitch`)
);

const velArr = useParam(computed(() => `matrix.step_${props.stepIndex}.vel`));

const iCount = useParam(computed(() => `matrix.step_${props.stepIndex}.i`));
</script>
