<template><q-slider v-model="c" /></template>
<script setup>
import { inject } from "vue";

const useParams = inject("useParams");

const { c } = useParams(["c"]);
</script>
