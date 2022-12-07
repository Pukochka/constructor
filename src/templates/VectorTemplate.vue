<template>
  <svg class="connectons-container fit" id="Vector"></svg>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { useVectorStore } from "../stores";

const vector = useVectorStore();

onMounted(() => {
  vector.InitParent(document.getElementById("container").getBoundingClientRect());
});
</script>
<style lang="scss">
.connectons-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: visible;
}
.line,
.arrow {
  stroke: rgb(199, 199, 199);
}
.arrow {
  fill: rgb(199, 199, 199);
}
</style>
