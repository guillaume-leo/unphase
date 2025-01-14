<template>
  <div class="row">
    <slider
      v-for="(_s, i) in model?.length"
      :model-value="model[i]"
      :min="props.min"
      :max="props.max"
      :key="i"
      @update:model-value="updateModel(i, $event)"
    />
  </div>
</template>

<script setup>
import { toRaw, inject } from "vue";
import Slider from "./Slider.vue";
const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
});
const model = inject("paramModel");

function updateModel(index, value) {
  const newModel = [...toRaw(model.value)];
  newModel[index] = value;
  model.value = newModel;
}
</script>
