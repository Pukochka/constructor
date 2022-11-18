<template>
  <div class="flex items-center" ref="element" :id="`route_button_${button.id}`">
    <q-btn
      @mouseenter="hover_connection_state = true"
      @mouseleave="hover_connection_state = false"
      dense
      :color="is_block_connection && has_button_connection ? 'warning' : 'primary'"
      :icon="!has_button_connection ? 'radio_button_unchecked' : 'radio_button_checked'"
      size="10px"
      round
      flat
      unelevated
    >
      <!-- <teleport to="#SvgArea" v-if="store.gett.parent">
        <g class="gpath" @click="line_menu_state = true">
          <circle
            stroke="transparent"
            fill="transparent"
            :cx="start_x"
            :cy="start_y"
            :r="store.gett.radius"
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
      </teleport> -->
      <q-tooltip anchor="top middle" self="bottom middle">{{ text_tooltip }} </q-tooltip>
      <q-menu anchor="bottom right" self="top middle">
        <q-list dense class="q-py-xs">
          <!-- <q-item class="text-primary items-center" clickable v-close-popup>
            <q-icon name="menu" />
            <q-item-section class="q-ml-sm">Связать с другой командой</q-item-section>
          </q-item> -->
          <q-item
            class="text-primary items-center"
            clickable
            v-if="has_button_connection && is_block_connection"
            v-close-popup
          >
            <q-icon name="edit" />
            <q-item-section class="q-ml-sm">Изменить связь с блоком</q-item-section>
          </q-item>
          <q-item
            class="text-primary items-center"
            clickable
            v-if="has_button_connection && !is_block_connection"
            v-close-popup
            @click="ChangeVisibilityDialogs(true, 'set_route')"
          >
            <q-icon name="edit" />
            <q-item-section class="q-ml-sm">Изменить путь</q-item-section>
          </q-item>
          <q-item
            class="text-primary items-center"
            clickable
            v-if="!has_button_connection"
            v-close-popup
            @click="ChangeVisibilityDialogs(true, 'set_route')"
          >
            <q-icon name="menu" />
            <q-item-section class="q-ml-sm">Добавить путь</q-item-section>
          </q-item>
          <!-- <q-item
            class="text-primary items-center"
            clickable
            v-close-popup
            v-if="!has_button_connection"
            @click="CreateCircle"
          >
            <q-icon name="lan" />
            <q-item-section class="q-ml-sm">Связать с блоком</q-item-section>
          </q-item> -->
          <q-item
            class="text-red items-center"
            clickable
            v-close-popup
            v-if="has_button_connection"
          >
            <q-icon name="delete" />
            <q-item-section class="q-ml-sm">{{ text_delete }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, PropType, computed, ref } from "vue";

import {
  useStatesStore,
  // useSvgStore,
  // useDataStore,
  // useSelectStore,
} from "../../../stores";
// import { useBeizerCurvature, usePolygonPoints } from "../../../helpers";

import { MessageInstance, InlineMenuButtonInstance } from "../../../types";
// import { useQuasar } from "quasar";

const element = ref<Element>();

const props = defineProps({
  button: Object as PropType<InlineMenuButtonInstance>,
  message: Object as PropType<MessageInstance>,
});

// const store = useSvgStore();
// const main = useDataStore();
// const select = useSelectStore();
// const $q = useQuasar();
const { ChangeVisibilityDialogs } = useStatesStore();
// const { StartCursorFollowing, DeleteConnectionAndUpdateLine } = useSvgStore();

const hover_connection_state = ref<boolean>(false);
// const line_menu_state = ref<boolean>(false);

const has_button_connection = computed(() => props.button.type !== 6);
const is_block_connection = computed(() => props.button.type === 5);

const text_tooltip = computed(() => {
  if (has_button_connection.value && is_block_connection.value)
    return "Изменить связь с блоком";
  else if (has_button_connection.value && !is_block_connection.value)
    return "Изменить путь";
  else return "Добавить путь";
});

const text_delete = computed(() => {
  if (has_button_connection.value && is_block_connection.value)
    return "Удалить связь с блоком";
  else if (has_button_connection.value && !is_block_connection.value)
    return "Удалить путь";
  else return "Связать";
});

// const start_x = computed(
//   () => store.all_buttons.find((item) => item.id === props.button.id).start_x
// );
// const start_y = computed(
//   () => store.all_buttons.find((item) => item.id === props.button.id).start_y
// );
// const path = computed(
//   () => store.all_buttons.find((item) => item.id === props.button.id).path
// );
// const polygon = computed(
//   () => store.all_buttons.find((item) => item.id === props.button.id).polygon
// );

// function CreateCircle(e: MouseEvent) {
//   if (
//     main.all_commands.find((item) => item.id === select.SelectedMessage.id).columns
//       .length <= 2 &&
//     main.all_commands
//       .find((item) => item.id === select.SelectedMessage.id)
//       .columns.find((item) => item.id === select.SelectedMessage.column_id).blocks
//       .length <= 1
//   ) {
//     $q.notify({
//       message: "Чтобы добавить связь с блоком нужно создать хотя бы 2 блока",
//       color: "red",
//     });
//     return;
//   }

//   const { clientY, clientX } = e;
//   const { x, y } = element.value.getBoundingClientRect();

//   const start_x_init =
//     x - store.gett.parent.x + store.gett.radius + store.gett.scroll_effect.horizontal;
//   const start_y_init =
//     y - store.gett.parent.y + store.gett.radius + store.gett.scroll_effect.vertical;
//   const client_x = clientX - store.gett.parent.x;
//   const client_y = clientY - store.gett.parent.y;

//   const new_assambly = {
//     id: props.button.id,
//     block_id: props.message.id,
//     column_id: props.message.column_id,
//     position: 0,
//     reverse: false,
//     start_x: start_x_init,
//     start_y: start_y_init,
//     end_x: client_x,
//     end_y: client_y,
//     path: useBeizerCurvature(start_x_init, start_y_init, client_x, client_y, false),
//     polygon: usePolygonPoints(client_x, client_y, start_x_init, false),
//   };

//   StartCursorFollowing(new_assambly);
// }
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
