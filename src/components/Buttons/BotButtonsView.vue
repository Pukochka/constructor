<template>
  <div class="">
    <q-toggle v-model="value" label="Добавить кнопки" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
// import { useDialogsStore, useSelectStore } from "../../stores/index";
// import ViewBotReplics from "../BotReplics/BotReplicsView.vue";

// const store = useDialogsStore();
// const { ChangeReplics } = useSelectStore();
const value = ref<boolean>(false);
</script>
<style lang="scss"></style>
