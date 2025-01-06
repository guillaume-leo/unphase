import { ref, watch, inject, computed } from 'vue'
import { sendMessage } from "@/scripts/sendMessage";

export const useParam = (keyRef) => {
  
    const visibleParameters = inject('visibleParameters')
    const pendingRequests = inject("pendingRequests");
    const isFetching = ref(true)
    const base = ref(null);

    const param = computed({
        get: () => base.value,
        set: (val) => {
            base.value = val
            if (!isFetching.value) sendMessage({ action: "update", key: keyRef.value, newValue: val });
        }
    })

    function sendRequestToSC(requestData) {
        return new Promise((resolve, reject) => {
          const requestId = "req_" + Math.floor(Math.random() * 10000);
          requestData.id = requestId;
      
          pendingRequests.value[requestId] = resolve;
      
          sendMessage(requestData);
        });
      }

    const observeParam = (path) => {
        isFetching.value = true
        visibleParameters.value[path] = param

        sendRequestToSC({ action: "observe", param: path })
        .then((response) => {
            // console.log("Received response from SC:", JSON.stringify(response.data), JSON.stringify(visibleParameters.value));
            // Initialize param value
            for (const [key, value] of Object.entries(response.data)) {
                visibleParameters.value[key] = value
            }
            isFetching.value = false
        })
        .catch((error) => {
            console.error("Error from SC:", error);
        });
    }

    const freeParam = (path) => {
        delete visibleParameters.value[path]
        sendMessage({
            action: "free",
            param: path,
        });
    }

    watch(keyRef, (newKeyRef, oldKeyRef) => {
        isFetching.value = true
        if (oldKeyRef) freeParam(oldKeyRef);
        observeParam(newKeyRef);
    }, {immediate: true})
    return param
}