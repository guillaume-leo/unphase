import { computed, onMounted, onUnmounted, ref } from "vue";

const pendingRequests = {};

function sendRequestToSC(requestData) {
  return new Promise((resolve, reject) => {
    // Generate a unique ID for this request
    const requestId = "req_" + Math.floor(Math.random() * 10000);
    requestData.id = requestId;

    // Store the resolve function in pendingRequests, to be used when the response arrives
    pendingRequests[requestId] = resolve;

    // Log the request to SuperCollider
    console.log("___SC___", JSON.stringify(requestData));
  });
}

window.message = (event) => {
  console.log("pendingRequest:", JSON.stringify(pendingRequests));

  const responseData = event;

  // Check if the response ID matches any pending request
  if (responseData && responseData.id && pendingRequests[responseData.id]) {
    // Resolve the corresponding Promise with the response data
    pendingRequests[responseData.id](responseData);

    // Clean up the pending request
    delete pendingRequests[responseData.id];
  }
};

export const useParams = (keys) => {
  const params = {};

  const baseValues = {};
  keys.forEach((key) => {
    baseValues[key] = ref(0);
  });

  keys.forEach((key) => {
    params[key] = computed({
      get() {
        return baseValues[key].value;
      },
      set(newValue) {
        const oldValue = baseValues[key].value;
        baseValues[key].value = newValue;

        // SIDE EFFECT HERE
        console.log("___SC___", JSON.stringify({ oldValue, newValue }));
      },
    });
  });

  onMounted(() => {
    sendRequestToSC({ action: "fetchData", keys })
      .then((response) => {
        console.log("Received response from SC:", response);
      })
      .catch((error) => {
        console.error("Error from SC:", error);
      });
  });

  onUnmounted(() => {
    console.log(
      "___SC___",
      JSON.stringify({
        action: "destroy",
        keys: keys,
      })
    );
  });

  return params;
};
