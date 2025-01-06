<template>
  <div class="row q-gutter-xs q-ma-xs items-center">
    <div class="col-12">{{ props.label }}</div>
    <q-input
      v-if="isEditing"
      v-model="inputModel"
      class="text-caption input-box"
      height="10"
      ref="inputEl"
      borderless
      outlined
      dense
      @blur="handleEdit(false)"
    ></q-input>
    <q-badge
      v-else
      v-for="(val, i) in model"
      :color="i === props.selected ? 'primary' : 'grey-8'"
      class="non-selectable"
      >{{ val }}</q-badge
    >
    <q-avatar
      icon="mdi-pencil"
      rounded
      color="grey"
      @click="handleEdit(!isEditing)"
      class="text-white cursor-pointer"
      size="xs"
    />
  </div>
</template>
<script setup>
import { nextTick, ref } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  selected: {
    type: Number,
    default: 0,
  },
});

const model = defineModel();

const inputModel = ref(null);
const inputEl = ref(null);
const isEditing = ref(false);

const handleEdit = (val) => {
  isEditing.value = val;
  if (val) {
    inputModel.value = model.value.join(" ");
    nextTick(() => inputEl.value.focus());
  } else {
    // TODO: VALIDATE INPUT FIRST
    model.value = inputModel.value.split(" ");
  }
};
</script>

<style scoped>
:deep(.input-box .q-field__control),
:deep(.input-box .q-field__marginal) {
  height: 20px;
}
</style>
