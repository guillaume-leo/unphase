<template>
  {{ paramModel }}

  <template v-if="!isSplit">
    <q-btn @click="split(false)">Split Vertically</q-btn>
    <q-btn @click="split(true)">Split Horizontally</q-btn>
  </template>
  <template v-else>
    <q-splitter
      v-model="splitterModel"
      :horizontal="paramModel.isHorizontal"
      style="height: 500px"
    >
      <template #before>
        <unphase-view v-model="paramModel.children[0]" />
      </template>
      <template #after>
        <unphase-view v-model="paramModel.children[1]" />
      </template>
    </q-splitter>
  </template>
</template>

<script setup>
import { computed, inject } from "vue";

const paramModel = inject("paramModel");

const subModel = defineModel();

const splitterModel = computed({
  get: () => paramModel.value.split,
  set: (newVal) => (paramModel.value.split = newVal),
});

const isSplit = computed(() => paramModel.value.children.length > 0);

function split(isHorizontal) {
  const newModel = { ...paramModel.value };
  newModel.isHorizontal = isHorizontal;
  newModel.children = [
    { name: "Child 1", split: 50, children: [] },
    { name: "Child 2", split: 50, children: [] },
  ];
  paramModel.value = newModel;
  subModel.value = newModel;
}
</script>
