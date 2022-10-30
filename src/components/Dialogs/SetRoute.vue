<template>
  <q-dialog v-model="store.dialogs.set_route" position="top" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>
      <q-card-section>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. porro. Rerum blanditiis
        perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro
        labore.
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { useDialogsStore } from "../../stores/index";
const store = useDialogsStore();
</script>
