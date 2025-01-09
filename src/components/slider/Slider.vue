<template>
  <div>
    <div ref="target" class="column relative-position">
      <q-slider
        v-model="model"
        thumb-size="0"
        class="no-pointer-events"
        vertical
        reverse
        dense
        :min="props.min"
        :max="props.max"
      />
      <q-badge
        v-if="!isOutside"
        class="non-selectable"
        floating
        color="black"
        >{{ model }}</q-badge
      >
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import {
  useMouseInElement,
  useMousePressed,
  useElementHover,
} from "@vueuse/core";

function mapRange(number, inputMin, inputMax, outputMin, outputMax) {
  // Ensure input range is valid to avoid division by zero
  if (inputMin === inputMax) {
    throw new Error("Input range cannot be zero");
  }

  // Calculate the mapped value
  const normalizedValue = (number - inputMin) / (inputMax - inputMin);
  return outputMin + normalizedValue * (outputMax - outputMin);
}

const clampNumber = (num, a, b) =>
  Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

const model = defineModel();
const target = ref(null);

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

const { isOutside, y, elementPositionY, elementHeight } =
  useMouseInElement(target);
const { pressed } = useMousePressed();
const hovered = useElementHover(target);

const mousePosition = computed(() =>
  mapRange(
    y.value,
    elementPositionY.value + elementHeight.value,
    elementPositionY.value,
    props.min,
    props.max
  )
);

watch([pressed, hovered, y], ([newPressed, newHovered]) => {
  if (newPressed && newHovered) {
    model.value = clampNumber(
      Math.round(mousePosition.value),
      props.min,
      props.max
    );
  }
});
</script>
