<template>
  <q-dialog v-model="state.Dialogs.sure_reset">
    <q-card>
      <q-card-section>
        <div class="row items-center justify-center q-mb-md">
          <q-icon size="26px" color="red" name="error" />

          <div class="text-h5 q-mx-md">Внимание</div>

          <q-icon size="26px" color="red" name="error" />
        </div>

        <div class="text-subtitle1">
          <div class="">
            При нажатии сбросить удалятся все маршруты, без возможности восстановления.
          </div>
          <div class="">Вы уверены, что хотите сбросить все маршруты?</div>
        </div>
        <div class="row q-gutter-sm justify-end q-mt-sm">
          <q-btn
            label="Сбросить"
            color="red"
            class="q-px-md"
            dense
            flat
            rounded
            v-close-popup
            :href="`/lk/common/premium/route/reset?bot_id=${CONFIG.BOT.id}`"
          />
          <q-btn
            dense
            unelevated
            rounded
            class="q-px-md"
            label="Отмена"
            color="primary"
            v-close-popup
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { useStatesStore } from "../../../stores";
import CONFIG from "../../../../botconfig";
const state = useStatesStore();
</script>
