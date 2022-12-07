<template>
  <div class="inline_button flex items-center" :id="`inline_${button.id}`">
    <q-btn
      @click="select.SelectState(props.button, 'button')"
      @mouseenter="hover_connection_state = true"
      @mouseleave="hover_connection_state = false"
      dense
      :color="is_lines_connection ? 'warning' : 'primary'"
      :icon="is_not_connection ? 'radio_button_unchecked' : 'radio_button_checked'"
      size="10px"
      round
      flat
      unelevated
    >
      <teleport to="#Vector" v-if="line">
        <g class="gpath" v-if="line">
          <circle
            stroke="transparent"
            fill="transparent"
            :cx="line.start_x"
            :cy="line.start_y"
            :r="vector.init.radius"
          />
          <path
            :class="{ active: hover_connection_state }"
            class="line"
            stroke-width="1.4"
            :d="line.path"
            fill="transparent"
          />
          <polygon
            :class="{ active: hover_connection_state }"
            class="arrow"
            :points="line.polygon"
            stroke-width="1"
          />
        </g>
      </teleport>
      <q-tooltip anchor="top middle" self="bottom middle">{{ text_tooltip }} </q-tooltip>
      <q-menu anchor="bottom right" self="top middle" v-model="menu_state">
        <q-list dense class="q-py-xs">
          <q-item
            class="text-primary items-center"
            clickable
            @click="StartLine"
            v-if="is_lines_connection"
            v-close-popup
          >
            <q-icon name="edit" />
            <q-item-section class="q-ml-sm">Изменить связь с блоком</q-item-section>
          </q-item>
          <q-item
            class="text-primary items-center"
            clickable
            v-if="is_route_connection"
            v-close-popup
            @click="state.ChangeVisibilityDialogs(true, 'set_route')"
          >
            <q-icon name="edit" />
            <q-item-section class="q-ml-sm">Изменить путь</q-item-section>
          </q-item>
          <q-item
            class="text-primary items-center"
            clickable
            v-if="is_not_connection"
            v-close-popup
            @click="state.ChangeVisibilityDialogs(true, 'set_route')"
          >
            <q-icon name="menu" />
            <q-item-section class="q-ml-sm">Добавить путь</q-item-section>
          </q-item>
          <q-item
            class="text-primary items-center"
            clickable
            v-close-popup
            v-if="is_not_connection"
            @click="StartLine"
          >
            <q-icon name="lan" />
            <q-item-section class="q-ml-sm">Связать с блоком</q-item-section>
          </q-item>
          <q-item
            class="text-red items-center"
            clickable
            @click="DeleteConnection"
            v-if="!is_not_connection"
          >
            <div class="absolute-center" v-if="loading_delete">
              <q-spinner color="red" size="1em" />
            </div>
            <div
              class="flex items-center no-wrap"
              :style="{
                visibility: loading_delete ? 'hidden' : 'visible',
              }"
            >
              <q-icon name="delete" />
              <q-item-section class="q-ml-sm">{{ text_delete }}</q-item-section>
            </div>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>
<script lang="ts" setup>
import { GetInlineMenu } from "../../../api";
import { defineProps, PropType, computed, ref, onMounted, onUnmounted } from "vue";

import {
  useStatesStore,
  useVectorStore,
  useSelectStore,
  useDataStore,
} from "../../../stores";

import { MessageInstance, InlineMenuButtonInstance } from "../../../types";

const props = defineProps({
  button: Object as PropType<InlineMenuButtonInstance>,
  message: Object as PropType<MessageInstance>,
});

const vector = useVectorStore();
const select = useSelectStore();
const state = useStatesStore();
const main = useDataStore();

const line = computed(
  () => vector.VectorLines.find((item) => item.id === props.button.id)?.line
);

const is_not_connection = computed(() => props.button.type === 6);
const is_lines_connection = computed(() => props.button.type === 5);
const is_route_connection = computed(
  () => props.button.type !== 5 && props.button.type !== 6
);

const hover_connection_state = ref<boolean>(false);
const loading_delete = ref<boolean>(false);
const menu_state = ref<boolean>(false);

const text_tooltip = computed(() => {
  if (is_lines_connection.value) return "Изменить связь с блоком";
  else if (is_route_connection.value) return "Изменить путь";
  else return "Добавить путь/Связать с блоком";
});

const text_delete = computed(() => {
  if (is_lines_connection.value) return "Удалить связь с блоком";
  else if (is_route_connection.value) return "Удалить путь";
  else return "Удалить";
});

function StartLine(e: MouseEvent) {
  vector.InitFollowing(e, props.button.id, props.message.id);
}

const DeleteConnection = () => {
  loading_delete.value = true;
  GetInlineMenu("update-data-and-type", {
    id: props.button.id,
    action: "free",
    type: 6,
    text: props.button.data.text,
  }).then((response) => {
    if (JSON.parse(response.data).result) {
      loading_delete.value = false;
      menu_state.value = false;
      main.UpdateInlineMenu(select.SelectedMessage.id, JSON.parse(response.data).data[0]);
      vector.UnMountedLine(props.button.id);
    }
  });
};
onMounted(() => {
  vector.MountedButton(props.button.id);
});
onUnmounted(() => {
  vector.UnMountedButton(props.button.id);
});
</script>
<style lang="scss">
.gpath .line {
  stroke: rgb(199, 199, 199);
  cursor: pointer;
}
.line.active {
  stroke: rgb(255, 179, 0);
}
.arrow.active {
  stroke: rgb(255, 179, 0) !important;
  fill: rgb(255, 179, 0) !important;
}
.gpath .arrow {
  stroke: rgb(199, 199, 199);
  fill: rgb(199, 199, 199);
  cursor: pointer;
}
.gpath {
  &:hover .line {
    stroke: rgb(255, 179, 0);
  }
}
.gpath {
  &:hover .arrow {
    stroke: rgb(255, 179, 0);
    fill: rgb(255, 179, 0);
  }
}
</style>
