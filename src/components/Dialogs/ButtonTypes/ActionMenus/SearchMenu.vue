<template>
  <q-menu fit style="max-height: 400px" persistent>
    <q-list>
      <q-item class="text-center" v-if="!FilteredRoutes.length">
        <q-item-section>Ничего не найдено!</q-item-section>
      </q-item>
      <q-item
        class="text-center"
        :class="{ 'bg-blue-4': false }"
        v-for="(item, index) in FilteredRoutes"
        :key="index"
        @click="emit('select', item)"
        clickable
        v-close-popup
      >
        <q-item-section>{{ item.text }}</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>
<script lang="ts" setup>
import { defineProps, PropType, computed, ref } from "vue";
import CONFIG from "../../../../../botconfig";
import { TextInput } from "../../../../types";

const props = defineProps({ text: Object as PropType<TextInput> });

const emit = defineEmits<{
  (e: "select", value): void;
}>();

const all_routes = ref([]);

for (const route of CONFIG.ROUTES) {
  if (route.type_value === 0) {
    all_routes.value.push(route);
  } else if (route.type_value === 1) {
    for (const r of route.options) {
      all_routes.value.push(r);
    }
  } else if (route.type_value === 2) {
    for (const r of route.options) {
      all_routes.value.push({
        id: r["id"],
        text: r["title"],
        description: r["description"],
        route: route.route + route.identifier + r["id"],
        identifier: route.identifier,
      });
    }
  }
}
all_routes.value.sort((a, b) => {
  var nameA = a.text.toLowerCase(),
    nameB = b.text.toLowerCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
});

const FilteredRoutes = computed(() =>
  all_routes.value.filter((item) =>
    item.text.toLowerCase().includes(props.text.value.toLowerCase())
  )
);
</script>
