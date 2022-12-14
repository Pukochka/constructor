<template>
  <div class="text-red text-caption q-pt-sm" v-if="!CONFIG.WEBS.length">
    На вашем тарифе недоступны или не созданы веб модули, либо ваш тип бота их не
    поддерживает
  </div>
  <div class="q-pt-sm" v-else>
    <div class="q-py-sm">Выберите модуль</div>
    <div class="rounded-borders custom-outline col">
      <q-item clickable class="text-center">
        <q-item-section class="ellipsis">{{ webs_item.text }}</q-item-section>
        <WebsMenu :select_item="webs_item" @select="selectItem" />
      </q-item>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSelectStore } from "src/stores";
import { onMounted, defineEmits, ref } from "vue";
import CONFIG from "../../../../botconfig";
import WebsMenu from "./ActionMenus/WebsMenu.vue";

const props = defineProps({ route: Boolean });

const select = useSelectStore();

const emit = defineEmits<{
  (e: "watch_end_route", value): void;
}>();

const selectItem = (item) => {
  webs_item.value = item;
  emit("watch_end_route", {
    value: webs_item.value.value,
    required() {
      return this.value;
    },
  });
};

const webs_item = ref({
  id: -1,
  text: "Выберите модуль",
  type: "",
  value: "",
});

onMounted(() => {
  if (props.route) {
    webs_item.value.text = CONFIG.WEBS.find(
      (item) => item.value === select.SelectedButton.data.action
    ).text;
    webs_item.value.value = select.SelectedButton.data.action;
    emit("watch_end_route", {
      value: select.SelectedButton.data.action,
      required() {
        return this.value;
      },
    });
  } else {
    webs_item.value = {
      id: -1,
      text: "Выберите модуль",
      type: "",
      value: "",
    };
    emit("watch_end_route", {
      value: "",
      required() {
        return true;
      },
    });
  }
});
</script>
