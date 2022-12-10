import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useErrorStore = defineStore('ErrorStore', () => {
  const ERROR_REQUEST = ref<boolean>(false);
  const ERROR_RESPONSE = ref<boolean>(false);
  const ERROR_MESSAGE = ref<string>('');

  const handleErrorReq = () => ERROR_REQUEST.value = true;
  const handleErrorRes = (message: string) => {
    if (!message) ERROR_MESSAGE.value = 'Произошла внутренняя ошибка сервера, обратитесь в поддержку.'
    ERROR_MESSAGE.value = message;
    ERROR_RESPONSE.value = true;
  };

  const error_req = computed(() => ERROR_REQUEST);
  const error_res = computed(() => ERROR_RESPONSE);
  const error_message = computed(() => ERROR_MESSAGE);
  return {
    ERROR_REQUEST,
    ERROR_RESPONSE,
    handleErrorReq,
    handleErrorRes,
    error_req,
    error_res,
    error_message
  }
});
