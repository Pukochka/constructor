<template>
  <div ref="svghelper">
    <q-btn dense color="red" size="6px" round unelevated :outline="has_button_connection">
      <q-tooltip anchor="top middle" self="bottom middle"
        >{{ has_button_connection ? "Указать путь" : "Показать путь" }}
      </q-tooltip>
      <q-menu>
        <q-list dense style="min-width: 100px">
          <q-item
            class="text-primary items-center"
            clickable
            v-close-popup
            @click="ChangeVisibilityDialogs(true, 'set_route')"
          >
            <q-icon name="menu" />
            <q-item-section class="q-ml-sm">Действие</q-item-section>
          </q-item>
          <q-item
            class="text-primary items-center"
            clickable
            v-close-popup
            @click="
              StartCursorFollowing(button_coords.id, button_coords.x, button_coords.y)
            "
          >
            <q-icon name="lan" />
            <q-item-section class="q-ml-sm">Связь с блоком</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, PropType, computed, ref, onMounted, onUnmounted } from "vue";

import { useDialogsStore, useSvgStore } from "../../../stores/index";

import { Button, Block } from "../../../types/types";

const svghelper = ref<Element>();

const props = defineProps({
  button: Object as PropType<Button>,
  block: Object as PropType<Block>,
});

const button_coords = ref({
  id: Date.now(),
  button_id: props.button.id,
  x: null,
  y: null,
});

const { ChangeVisibilityDialogs } = useDialogsStore();
const { DetermingCircle, DeativateCircle, StartCursorFollowing } = useSvgStore();
const svg = useSvgStore();

const CreateCircle = () => {
  const el = document.getElementById("SvgArea");
  const parent = el.getBoundingClientRect();
  const { x, y } = svghelper.value.getBoundingClientRect();
  button_coords.value.x = x - parent.x + svg.svg.circle.radius;
  button_coords.value.y = y - parent.y + svg.svg.circle.dpi_y;

  DetermingCircle(button_coords.value);
};

onMounted(() => CreateCircle());

onUnmounted(() => DeativateCircle(button_coords.value.id));

const has_button_connection = computed(() => !props.button.connection);
</script>
