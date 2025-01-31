<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-btn
        dense
        round
        flat
        :icon="`mdi-chevron-${miniLeftState ? 'right' : 'left'}`"
        @click="miniLeftState = !miniLeftState"
      />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      :mini="miniLeftState"
      behavior="desktop"
      bordered
      :width="leftWidth"
    >
      <div style=""></div>
      <q-btn
        dense
        round
        flat
        icon="mdi-chevron-right"
        class="absolute"
        v-touch-pan.horizontal.prevent.mouse="handlePan"
        style="right: 0"
      ></q-btn>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      behavior="desktop"
      bordered
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const leftDrawerOpen = ref(true);
const miniLeftState = ref(true);
const rightDrawerOpen = ref(false);
const info = ref(null);
const panning = ref(false);
const leftWidth = ref(200);

function handlePan({ evt, ...newInfo }) {
  info.value = newInfo;

  leftWidth.value = newInfo.position.left;

  // native Javascript event
  // console.log(evt)

  if (newInfo.isFirst) {
    panning.value = true;
  } else if (newInfo.isFinal) {
    panning.value = false;
  }
}
</script>

<style scoped lang="scss">
// .grid {
//   display: grid;
//   grid-template-columns: repeat(8, 1fr);
//   gap: 5px;
// }
</style>
