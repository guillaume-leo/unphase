import { computed, onMounted, onUnmounted, ref, inject } from "vue";
import { sendMessage } from "@/scripts/sendMessage";

function sendRequestToSC(requestData) {
  const pendingRequests = inject("pendingRequests");
  return new Promise((resolve, reject) => {
    const requestId = "req_" + Math.floor(Math.random() * 10000);
    requestData.id = requestId;

    pendingRequests.value[requestId] = resolve;

    sendMessage(requestData);
  });
}

export const useParams = (keys, opt) => {
  console.log("use params hjave been called");

  const params = {};

  const baseValues = {};
  keys.forEach((key) => {
    baseValues[key] = ref(null);
  });

  keys.forEach((key) => {
    params[key] = computed({
      get() {
        return baseValues[key].value;
      },
      set(value) {
        // oldValue >>> baseValues[key].value;
        baseValues[key].value = value;

        sendMessage({ action: "update", key, value });
      },
    });
  });

  onMounted(() => {
    sendRequestToSC({ action: "fetch", keys })
      .then((response) => {
        console.log("Received response from SC:", JSON.stringify(response));
      })
      .catch((error) => {
        console.error("Error from SC:", error);
      });
  });

  onUnmounted(() => {
    sendMessage({
      action: "destroy",
      keys: keys,
    });
  });

  return params;
};
