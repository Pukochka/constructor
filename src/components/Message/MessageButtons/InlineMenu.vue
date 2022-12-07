<template>
  <div class="row">
    <div
      class="text-caption text-center text-grey full-width q-pt-sm"
      v-if="message.inline_menu?.lines.length === 0"
    >
      Перейдите в настройки кнопок, чтобы добавить кнопку
    </div>
    <div class="col-12" v-for="line in message.inline_menu?.lines" :key="line.id">
      <SingleButton
        :message="message"
        :button="button"
        v-for="button in line.buttons"
        :key="button.id"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUpdateLines } from "../../../helpers";
import { defineProps, PropType, onUpdated } from "vue";
import { MessageInstance } from "../../../types";
import SingleButton from "./SingleButton.vue";

defineProps({
  message: Object as PropType<MessageInstance>,
});

onUpdated(() => useUpdateLines(false));
</script>
