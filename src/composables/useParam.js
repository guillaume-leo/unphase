import { ref, watch, computed } from "vue";
import { useGlobalStore } from "@/stores/global";
import { storeToRefs } from "pinia";

export const useParam = (keyRef) => {
  const store = useGlobalStore();

  const { isFetching } = storeToRefs(store);

  const base = ref(null);

  const param = computed({
    get: () => base.value,
    set: (val) => {
      base.value = val;
      if (!isFetching.value)
        store.formatMessage({
          action: "update",
          key: keyRef.value,
          newValue: val,
        });
    },
  });

  watch(
    keyRef,
    (newKeyRef, oldKeyRef) => {
      isFetching.value = true;
      if (oldKeyRef) store.freeParam(oldKeyRef);
      store.observeParam(newKeyRef, param);
    },
    { immediate: true }
  );
  return param;
};
