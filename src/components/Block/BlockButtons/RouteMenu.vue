<template>
  <div class="flex items-center" ref="svghelper">
    <q-btn
      dense
      color="primary"
      size="6px"
      round
      unelevated
      :outline="has_button_connection"
    >
      <teleport to="#SvgArea" v-if="start_x">
        <g class="gpath">
          <circle
            stroke="transparent"
            fill="transparent"
            :cx="start_x"
            :cy="start_y"
            :r="7"
          />
          <path class="line" stroke-width="1" :d="path" fill="transparent" />
          <polygon class="arrow" :points="polygon" stroke-width="1" />
        </g>
      </teleport>
      <q-tooltip anchor="top middle" self="bottom middle"
        >{{ has_button_connection ? "Указать путь" : "Показать путь" }}
      </q-tooltip>
      <q-menu>
        <q-list dense style="min-width: 100px">
          <!-- <q-item class="text-primary items-center" clickable v-close-popup>
            <q-icon name="menu" />
            <q-item-section class="q-ml-sm">Связать с другой командой</q-item-section>
          </q-item> -->
          <q-item
            class="text-primary items-center"
            clickable
            v-close-popup
            @click="ChangeVisibilityDialogs(true, 'set_route', button)"
          >
            <q-icon name="menu" />
            <q-item-section class="q-ml-sm">Действие</q-item-section>
          </q-item>
          <q-item
            class="text-primary items-center"
            clickable
            v-close-popup
            @click="CreateCircle"
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
import { defineProps, PropType, computed, ref } from "vue";

import { useDialogsStore, useSvgStore } from "../../../stores";
import { useBeizerCurvature, usePolygonPoints } from "../../../helpers";

import { Button, Block, Coords } from "../../../types";

const svghelper = ref<Element>();

const props = defineProps({
  button: Object as PropType<Button>,
  block: Object as PropType<Block>,
});

const new_assambly = ref<Coords>({
  start_x: null,
  start_y: null,
  path: "",
  polygon: "",
});

const svg = useSvgStore();
const { ChangeVisibilityDialogs } = useDialogsStore();
const { StartCursorFollowing } = useSvgStore();

const has_button_connection = computed(() => !props.button.connection.to);

const start_x = computed(() => props.button.connection.coords.start_x);
const start_y = computed(() => props.button.connection.coords.start_y);
const path = computed(() => props.button.connection.coords.path);
const polygon = computed(() => props.button.connection.coords.polygon);

function CreateCircle(e: MouseEvent) {
  const parent = document.getElementById("SvgArea").getBoundingClientRect();
  const { clientY, clientX } = e;
  const { x, y } = svghelper.value.getBoundingClientRect();

  const start_x_init = x - parent.x + svg.gett.radius;
  const start_y_init = y - parent.y + svg.gett.radius;
  const client_x = clientX - parent.x;
  const client_y = clientY - parent.y;

  new_assambly.value = {
    start_x: start_x_init,
    start_y: start_y_init,
    path: useBeizerCurvature(start_x_init, start_y_init, client_x, client_y),
    polygon: usePolygonPoints(client_x, client_y, start_x_init),
  };

  StartCursorFollowing(new_assambly.value);
}
</script>
<style lang="scss">
.gpath .line {
  transition: 0.2s stroke, fill;
  stroke: $grey-5;
  cursor: pointer;
}
.gpath .arrow {
  transition: 0.2s stroke, fill;
  stroke: $grey-5;
  fill: $grey-5;
  cursor: pointer;
}
.gpath {
  &:hover .line {
    stroke: $red;
  }
}
.gpath {
  &:hover .arrow {
    stroke: $red;
    fill: $red;
  }
}
</style>
