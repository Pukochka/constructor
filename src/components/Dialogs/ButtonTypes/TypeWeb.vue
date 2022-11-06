<template>
  <div class="text-red text-caption q-pt-sm">
    На вашем тарифе недоступны или не созданы веб модули, либо ваш тип бота их не
    поддерживает
  </div>
</template>
<script lang="ts" setup>
import { onMounted, defineEmits } from "vue";

const emit = defineEmits<{
  (e: "watch_end_route", value): void;
}>();

onMounted(() => {
  emit("watch_end_route", {
    value: "",
    required() {
      return true;
    },
  });
});
</script>
