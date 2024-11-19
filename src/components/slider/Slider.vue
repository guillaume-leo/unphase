<template>
  <div ref="target" class="column justify-end" style="min-height: 250px">
    <div class="percent q-mr-xs text-white" :class="{ outlined: !isOutside }">
      {{ Math.round(reactiveSlider) }}
    </div>
  </div>
</template>

<script setup>
import { useMouseInElement } from "@vueuse/core";
import { ref, computed } from "vue";

function mapRange(number, inputMin, inputMax, outputMin, outputMax) {
  // Ensure input range is valid to avoid division by zero
  if (inputMin === inputMax) {
    throw new Error("Input range cannot be zero");
  }

  // Calculate the mapped value
  const normalizedValue = (number - inputMin) / (inputMax - inputMin);
  return outputMin + normalizedValue * (outputMax - outputMin);
}

const target = ref(null);
const sliderValue = ref(0);

const { isOutside, y, elementPositionY, elementHeight } =
  useMouseInElement(target);

const test = computed(() => {
  return !isOutside.value && props.pressed
    ? (reactiveSlider.value =
        mapRange(
          y.value,
          elementPositionY.value + elementHeight.value,
          elementPositionY.value,
          0,
          100
        ) + "%")
    : reactiveSlider.value + "%";
});

const reactiveSlider = computed({
  get: () => sliderValue.value,
  set: () => {
    if (props.pressed) {
      sliderValue.value = mapRange(
        y.value,
        elementPositionY.value + elementHeight.value,
        elementPositionY.value,
        0,
        100
      );
    }
  },
});

const props = defineProps({
  pressed: {
    type: Boolean,
    default: false,
  },
});
</script>

<style setup>
.outlined {
  outline: solid 1px black;
}

.percent {
  min-height: v-bind(test);
  background: black;
}
</style>
