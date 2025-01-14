<template>
  <div v-if="!isLoading" class="text-bold">
    <slot name="default" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, toRaw, provide, watch } from "vue";
import { useGlobalStore } from "@/stores/global";

const globalStore = useGlobalStore();
const param = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  param.value = await globalStore.observeParam(props.path, param);
  isLoading.value = false;
});

onUnmounted(() => {
  globalStore.freeParam(props.path);
});

watch(param, (newValue) => {
  if (isLoading.value) return;

  globalStore.updateParam(props.path, toRaw(newValue));
});

provide("paramModel", param);

const props = defineProps({
  path: {
    type: String,
    default: null,
  },
});

watch(
  () => props.path,
  async (newPath, oldPath) => {
    globalStore.freeParam(oldPath);

    isLoading.value = true;
    param.value = await globalStore.observeParam(newPath, param);
    isLoading.value = false;
  }
);
</script>
