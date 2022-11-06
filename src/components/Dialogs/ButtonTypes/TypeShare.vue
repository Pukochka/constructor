<template>
  <div class="q-py-sm q-pt-md">
    <q-input
      v-model="text.value"
      outlined
      autogrow
      label="Ваш текст"
      :rules="[() => !text.required() || 'Введено неверное количество символов']"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted, defineProps } from "vue";
import { TextInput } from "../../../types";
import { useSelectStore } from "../../../stores";

const select = useSelectStore();

const props = defineProps({ route: Boolean });

const text = ref<TextInput>({
  value: "Поделиться",
  required() {
    return !(this.value.length < this.max && this.value.length > this.min);
  },
  min: 1,
  max: 100,
});

const emit = defineEmits<{
  (e: "watch_end_route", value): void;
}>();

watch(text.value, () => emit("watch_end_route", text.value));

onMounted(() => {
  const value = ref<string>("");
  if (props.route) value.value = select.SelectedButton.connection.to;
  else value.value = "Поделиться";

  text.value = {
    value: value.value,
    required() {
      return !(this.value.length < this.max && this.value.length > this.min);
    },
    min: 1,
    max: 100,
  };
  emit("watch_end_route", text.value);
});
</script>
