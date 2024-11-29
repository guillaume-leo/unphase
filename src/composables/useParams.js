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
  const visibleParameters = inject('visibleParameters')

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
    
    visibleParameters.value[key] = params[key]
  });

  // We want here to start observation when the param is on the page and init his value from supercollider
  onMounted(() => {
    sendRequestToSC({ action: "observe", keys })
      .then((response) => {
        // console.log("Received response from SC:", JSON.stringify(response.data), JSON.stringify(visibleParameters.value));
        // Initialize param value
        for (const [key, value] of Object.entries(response.data)) {
          visibleParameters.value[key] = value
        }
      })
      .catch((error) => {
        console.error("Error from SC:", error);
      });
  });

  // We want here to remove observation when the param is not on the page anymore
  onUnmounted(() => {
    sendMessage({
      action: "free",
      keys: keys,
    });
    keys.forEach((key) => delete visibleParameters.value[key])
  });

  return params;
};
