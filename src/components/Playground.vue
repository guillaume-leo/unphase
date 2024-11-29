<template>
  <div ref="target" class="row q-mx-lg justify-between non-selectable">
    <!-- <slider class="col-grow" v-for="i in 64" :key="i" :pressed="pressed" /> -->
    <q-slider v-model="a" />
    <q-slider v-model="b" />
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import { useMousePressed } from "@vueuse/core";
import Slider from "@/components/slider/Slider.vue";

const useParams = inject("useParams");

const { a, b } = useParams(["a", "b"]);

const multiSlider = ref([]);
const target = ref(null);

const { pressed } = useMousePressed({ target: target });
</script>
