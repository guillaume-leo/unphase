<template>
  <q-slider v-model="a"></q-slider>
  {{ a }} {{ b }}
</template>

<script setup>
import { inject } from "vue";

const useParams = inject("useParams");

const { a, b } = useParams(["a", "b"]);
</script>
