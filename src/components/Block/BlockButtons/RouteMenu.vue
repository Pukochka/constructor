<template>
  <div class="flex items-center" ref="svghelper">
    <q-btn
      @mouseenter="hover_connection_state = true"
      @mouseleave="hover_connection_state = false"
      dense
      :color="is_block_connection && !has_button_connection ? 'warning' : 'primary'"
      :icon="has_button_connection ? 'radio_button_unchecked' : 'radio_button_checked'"
      size="10px"
      round
      flat
      unelevated
    >
      <teleport to="#SvgArea" v-if="start_x">
        <g class="gpath" @click="line_menu_state = true">
          <circle
            stroke="transparent"
            fill="transparent"
            :cx="start_x"
            :cy="start_y"
            :r="7"
          />
          <path
            :class="{ active: hover_connection_state }"
            class="line"
            stroke-width="1.4"
            :d="path"
            fill="transparent"
          />
          <polygon
            :class="{ active: hover_connection_state }"
            class="arrow"
            :points="polygon"
            stroke-width="1"
          />
        </g>
      </teleport>
      <q-tooltip anchor="top middle" self="bottom middle"
        >{{ has_button_connection ? "Указать путь" : "Показать путь" }}
      </q-tooltip>
      <q-menu anchor="bottom right" self="top middle">
        <q-list dense class="q-py-xs">
          <!-- <q-item class="text-primary items-center" clickable v-close-popup>
            <q-icon name="menu" />
            <q-item-section class="q-ml-sm">Связать с другой командой</q-item-section>
          </q-item> -->
          <q-item
            class="text-primary items-center"
            clickable
            v-if="button.connection.to"
            v-close-popup
            @click="ChangeVisibilityDialogs(true, 'set_route', button)"
          >
            <q-icon name="edit" />
            <q-item-section class="q-ml-sm">Изменить связь/путь</q-item-section>
          </q-item>
          <q-item
            class="text-primary items-center"
            clickable
            v-if="!button.connection.to"
            v-close-popup
            @click="ChangeVisibilityDialogs(true, 'set_route', button)"
          >
            <q-icon name="menu" />
            <q-item-section class="q-ml-sm">Добавить путь</q-item-section>
          </q-item>
          <q-item
            class="text-primary items-center"
            clickable
            v-close-popup
            v-if="!button.connection.to"
            @click="CreateCircle"
          >
            <q-icon name="lan" />
            <q-item-section class="q-ml-sm">Связь с блоком</q-item-section>
          </q-item>
          <q-item
            class="text-red items-center"
            clickable
            v-close-popup
            v-if="button.connection.to"
          >
            <q-icon name="delete" />
            <q-item-section class="q-ml-sm">Удалить связь/путь</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, PropType, computed, ref } from "vue";

import { useStatesStore, useSvgStore } from "../../../stores";
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
  end_x: null,
  end_y: null,
  path: "",
  polygon: "",
});

const svg = useSvgStore();
const { ChangeVisibilityDialogs } = useStatesStore();
const { StartCursorFollowing } = useSvgStore();

const hover_connection_state = ref<boolean>(false);
const line_menu_state = ref<boolean>(false);

const has_button_connection = computed(() => !props.button.connection.to);
const is_block_connection = computed(() => props.button.connection.type === 5);

const start_x = computed(() => props.button.connection.coords.start_x);
const start_y = computed(() => props.button.connection.coords.start_y);
const path = computed(() => props.button.connection.coords.path);
const polygon = computed(() => props.button.connection.coords.polygon);

function CreateCircle(e: MouseEvent) {
  const { clientY, clientX } = e;
  const { x, y } = svghelper.value.getBoundingClientRect();

  const start_x_init = x - svg.gett.parent.x + svg.gett.radius;
  const start_y_init = y - svg.gett.parent.y + svg.gett.radius;
  const client_x = clientX - svg.gett.parent.x;
  const client_y = clientY - svg.gett.parent.y;

  new_assambly.value = {
    start_x: start_x_init,
    start_y: start_y_init,
    end_x: client_x,
    end_y: client_y,
    path: useBeizerCurvature(start_x_init, start_y_init, client_x, client_y),
    polygon: usePolygonPoints(client_x, client_y, start_x_init),
  };

  StartCursorFollowing(new_assambly.value);
}
</script>
<style lang="scss">
.gpath .line {
  stroke: $grey-5;
  cursor: pointer;
}
.line.active {
  stroke: $warning;
}
.arrow.active {
  stroke: $warning !important;
  fill: $warning !important;
}
.gpath .arrow {
  stroke: $grey-5;
  fill: $grey-5;
  cursor: pointer;
}
.gpath {
  &:hover .line {
    stroke: $warning;
  }
}
.gpath {
  &:hover .arrow {
    stroke: $warning;
    fill: $warning;
  }
}
</style>
