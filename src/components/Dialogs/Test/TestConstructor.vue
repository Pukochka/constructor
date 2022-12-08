<template>
  <q-dialog
    transition-hide="slide-down"
    transition-show="slide-up"
    v-model="state.Dialogs.test_constructor"
    full-height
    persistent
  >
    <q-card class="q-pa-md" style="width: 60%">
      <div class="fit">
        <div class="row justify-between items-center q-mb-sm">
          <div class="row items-center">
            <q-icon name="forum" color="primary" size="26px" />

            <div class="text-h5 q-ml-sm">Тестировка сценария</div>
          </div>

          <q-btn
            flat
            round
            icon="close"
            color="primary"
            v-close-popup
            @click="test.EndTest"
          />
        </div>
        <div class="rounded-borders custom-outline">
          <div class="">
            <div class="row justify-between items-center q-px-sm">
              <div class="row items-center q-py-sm">
                <q-avatar color="primary" size="40px" />

                <div class="text-h5 q-ml-md">Ваш бот</div>
              </div>

              <q-btn flat round icon="more_vert" color="primary">
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item clickable v-close-popup @click="test.ReloadTest">
                      <q-item-section>Перезапустить тест</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>

            <q-separator />
          </div>
          <q-scroll-area
            ref="scrollAreaRef"
            :thumb-style="thumbStyle"
            :style="{ height: 'calc(100vh - 250px)' }"
          >
            <div class="q-pa-sm column q-gutter-md" id="scrollArea">
              <transition-group name="list">
                <TestMessageItem
                  v-for="message in test.TestReady"
                  :key="message.id"
                  :message="message"
                  @scroll="scroll"
                />
              </transition-group>
            </div>
          </q-scroll-area>
          <q-input
            input-class="text-subtitle1"
            color="grey-5"
            round
            outlined
            v-model="text"
          >
            <div class="row items-center">
              <q-btn icon="send" color="primary" flat round />
            </div>
          </q-input>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useStatesStore, useTestStore } from "../../../stores";
import TestMessageItem from "./TestMessageItem.vue";

const thumbStyle = {
  right: "4px",
  height: "6px",
  bottom: "4px",
  padding: "2px",
  "border-radius": "5px",
  "background-color": "rgb(76, 76, 76)",
  width: "6px",
};

const scrollAreaRef = ref(null);

const state = useStatesStore();
const test = useTestStore();

const text = ref<string>("");

const scroll = () => {
  scrollAreaRef.value.setScrollPosition(
    "vertical",
    document.getElementById("scrollArea").getBoundingClientRect().height,
    300
  );
};
</script>
