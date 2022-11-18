<template>
  <div class="row" ref="button_container">
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
        :button_container="button_container"
        v-for="button in line.buttons"
        :key="button.id"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, PropType, ref /*, onUpdated*/ } from "vue";
import { MessageInstance } from "../../../types";
import SingleButton from "./SingleButton.vue";
// import { useSvgStore } from "../../../stores";

defineProps({
  message: Object as PropType<MessageInstance>,
});

const button_container = ref<Element>();

// const { UpdateButtons } = useSvgStore();

// onUpdated(() => UpdateButtons());
</script>
