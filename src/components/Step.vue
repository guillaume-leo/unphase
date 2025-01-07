<template>
  <q-btn
    @mouseover="handleOver(true)"
    @mouseleave="handleOver(false)"
    outline
    square
    dense
    @click="selectedStep = index"
  >
    <q-badge
      v-if="showBadge || selectedStep === index"
      floating
      color="black"
      >{{ props.index }}</q-badge
    >
  </q-btn>
</template>

<script setup>
import { ref } from "vue";
import { useGlobalStore } from "@/stores/global";
import { storeToRefs } from "pinia";

const store = useGlobalStore();

const { selectedStep } = storeToRefs(store);

const props = defineProps({
  index: {
    type: Number,
    default: null,
  },
});

const showBadge = ref(false);

const handleOver = (v) => {
  showBadge.value = v;
};
</script>
