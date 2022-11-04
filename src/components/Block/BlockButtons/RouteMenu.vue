<template>
  <div class="flex items-center" ref="svghelper">
    <q-btn
      dense
      color="primary"
      size="6px"
      round
      unelevated
      :outline="has_button_connection"
      @click="ChangeVisibilityDialogs(true, 'set_route')"
    >
      <q-tooltip anchor="top middle" self="bottom middle"
        >{{ has_button_connection ? "Указать путь" : "Показать путь" }}
      </q-tooltip>
      <!-- <q-menu>
        <q-list dense style="min-width: 100px">
          <q-item class="text-primary items-center" clickable v-close-popup>
            <q-icon name="menu" />
            <q-item-section class="q-ml-sm">Связать с другой командой</q-item-section>
          </q-item>
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
            @click="StartCursorFollowing(new_assambly)"
          >
            <q-icon name="lan" />
            <q-item-section class="q-ml-sm">Связь с блоком</q-item-section>
          </q-item>
        </q-list>
      </q-menu> -->
    </q-btn>
  </div>
</template>
<script lang="ts" setup>
import {
  defineProps,
  PropType,
  computed,
  ref,
  onMounted,
  onUnmounted,
  onUpdated,
} from "vue";

import { useDialogsStore, useSvgStore } from "../../../stores/index";

import { Button, Block } from "../../../types/types";

const svghelper = ref<Element>();

const props = defineProps({
  button: Object as PropType<Button>,
  block: Object as PropType<Block>,
});

const new_assambly = {
  button_id: null,
  start_x: null,
  start_y: null,
  action: false,
  path: {
    beizer_curve: "",
  },
  polygon_points: "",
};

const parent = ref<DOMRect>();

const { ChangeVisibilityDialogs } = useDialogsStore();
const {
  DetermingCollection,
  UpdateCollection,
  // StartCursorFollowing,
} = useSvgStore();
const svg = useSvgStore();

const CreateCircle = (parent: DOMRect, id: number) => {
  const { x, y } = svghelper.value.getBoundingClientRect();
  new_assambly.start_x = x - parent.x + svg.gett.radius;
  new_assambly.start_y = y - parent.y + svg.gett.radius;
  new_assambly.button_id = id;
  // console.log(new_assambly);
  DetermingCollection(new_assambly);
  // UpdateCollection();
};

onUpdated(() => {
  CreateCircle(parent.value, props.button.id);
  UpdateCollection();
});

onMounted(() => {
  parent.value = document.getElementById("SvgArea").getBoundingClientRect();
  CreateCircle(parent.value, props.button.id);
  // console.log(svg.gett.collections);
});

onUnmounted(() => {
  UpdateCollection();
});

// watch(svg.gett.collections, () => console.log(svg.gett.collections));

const has_button_connection = computed(() => !props.button.connection);
</script>
