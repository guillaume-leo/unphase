<template>
  <div v-if="!isLoading" class="text-bold">
    <unphase-input v-model="param" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, toRaw, unref, watch } from "vue";
import { useGlobalStore } from "@/stores/global";
import UnphaseInput from "@/components/UnphaseInput.vue";

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

watch(param, () => {
  if (isLoading.value) return;

  console.log("new value ", toRaw(param.value));
});

const props = defineProps({
  path: {
    type: String,
    default: null,
  },
});
</script>
