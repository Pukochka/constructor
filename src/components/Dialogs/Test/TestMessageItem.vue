<template>
  <div class="row no-wrap mw-80" :class="{ 'self-end': sent }">
    <div class="row no-wrap" :class="{ reverse: sent }">
      <q-avatar
        :color="sent ? 'secondary' : 'primary'"
        text-color="white"
        size="34px"
        class="self-end"
      >
        {{ sent ? "В" : "Б" }}
      </q-avatar>
      <div class="q-mx-sm">
        <div
          class="rounded-borders bg-grey-3 row relative-position"
          :class="{
            'treangle-sent': is_send,
            'treangle-send': is_sent,
          }"
        >
          <div class="text-subtitle2 q-pt-sm q-px-sm">
            {{ message.text.content }}
          </div>
          <div class="text-caption text-grey self-end q-px-xs text-right full-width">
            <div class="">{{ time }}</div>
          </div>
        </div>
        <div class="q-mt-xs column q-gutter-xs">
          <div
            class="row no-wrap q-col-gutter-x-xs"
            v-for="line in message.inline_menu?.lines"
            :key="line.id"
          >
            <div
              class="col"
              v-for="button in line.buttons"
              :key="button.id"
              v-show="button.type !== 6"
            >
              <q-item
                dense
                @click="Answer(button)"
                class="rounded-borders bg-grey-3 text-center text-subtitle2 ellipsis q-px-sm"
                clickable
                v-ripple
              >
                <q-item-section>{{ button.data.text }}</q-item-section>
              </q-item>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useTestStore } from "stores";
import { InlineMenuButtonInstance, MessageInstance } from "c-types";

import { defineProps, PropType, ref, onMounted, computed, defineEmits } from "vue";

const props = defineProps({
  message: Object as PropType<MessageInstance>,
});

const emit = defineEmits<{
  (e: "scroll"): void;
}>();

const test = useTestStore();

const time = ref<string>("");

const sent = computed(() => props.message.type.id === -1);

const is_sent = computed(
  () => !props.message.inline_menu?.lines.length && props.message.type.id !== -1
);

const is_send = computed(
  () => !props.message.inline_menu?.lines.length && props.message.type.id === -1
);

const Answer = (button: InlineMenuButtonInstance) => {
  setTimeout(() => {
    test.UserAnswers(button);
    emit("scroll");
  }, 100);
  setTimeout(() => {
    test.ToConnectMessage(button);
    emit("scroll");
  }, 700);
};

onMounted(() => {
  const date = new Date();
  let hours = date.getHours().toLocaleString();
  let min = date.getMinutes().toLocaleString();

  if (hours.length === 1) {
    hours = "0" + hours;
  }
  if (min.length === 1) {
    min = "0" + min;
  }
  time.value = `${hours}:${min}`;
});
</script>
<style lang="scss">
.treangle {
  color: black;
  &-sent {
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      right: -6px;
      width: 12px;
      height: 8px;
      background: #eee;
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }
  }
  &-send {
    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: -6px;
      width: 12px;
      height: 8px;
      background: #eee;
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    }
  }
}
.mw-80 {
  max-width: 80%;
}
</style>
