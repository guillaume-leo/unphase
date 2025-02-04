import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useGlobalStore = defineStore("global", () => {
  // vue <-> sc communication
  const formatMessage = (data) => console.log("___SC___", JSON.stringify(data));

  const pendingRequests = ref({});

  const sendRequestToSC = (requestData) => {
    return new Promise((resolve, reject) => {
      const requestId = "req_" + Math.floor(Math.random() * 10000);
      requestData.id = requestId;

      pendingRequests.value[requestId] = resolve;

      formatMessage(requestData);
    });
  };

  window.processRequest = (responseData) => {
    if (
      responseData &&
      responseData.id &&
      pendingRequests.value[responseData.id]
    ) {
      pendingRequests.value[responseData.id](responseData);
      delete pendingRequests.value[responseData.id];
    }
  };

  window.updateParam = (obj) => {
    if (obj.key in visibleParameters.value)
      visibleParameters.value[obj.key] = obj.value;
  };

  // vue <-> sc reactivity
  const visibleParameters = ref({});

  const observeParam = async (path, param) => {
    
    if (visibleParameters.value[path]) {
      return visibleParameters.value[path]
    }

    visibleParameters.value[path] = param;

    return sendRequestToSC({ action: "observe", param: path })
      .then((response) => {
        // console.log("Received response from SC:", JSON.stringify(response.data), JSON.stringify(visibleParameters.value));
        // Initialize param value
        for (const [key, value] of Object.entries(response.data)) {
          visibleParameters.value[key] = value;
        }
        return visibleParameters.value[path];
      })
      .catch((error) => {
        console.error("Error from SC:", error);
      });
  };
  const freeParam = (path) => {
    delete visibleParameters.value[path];
    formatMessage({
      action: "free",
      param: path,
    });
  };

  const freeAll = () =>
    Object.keys(visibleParameters.value).forEach((paramKey) => {
      freeParam(paramKey);
    });

  const updateParam = (path, newValue) => {
    formatMessage({
      action: "update",
      key: path,
      newValue
    });
  }

  const selectedStep = ref(1);
  const selectStep = (newStep) => (selectedStep.value = newStep);

  return {
    formatMessage,
    observeParam,
    freeParam,
    selectedStep,
    selectStep,
    freeAll,
    updateParam
  };
});
