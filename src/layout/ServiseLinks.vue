<template>
  <div class="bg-primary flex flex-center">
    <div class="q-pa-md text-white text-center">
      <div class="text-subtitle1">Сервисы</div>
      <div class="text-caption">Для улучшения Ваших ботов</div>
    </div>
  </div>
  <q-list padding>
    <q-item dense class="q-mt-sm text-primary">
      <q-item-section> Генератор ссылок </q-item-section>
    </q-item>
    <q-item
      dense
      clickable
      v-close-popup
      href="https://bot-t.com/faq/HELP/servis_generacii_ssylok"
      target="_blank"
    >
      <q-item-section avatar top>
        <q-avatar
          size="30px"
          font-size="20px"
          color="transparent"
          text-color="primary"
          icon="info"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Инстурукция</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      dense
      clickable
      v-close-popup
      href="https://bot-t.com/link/create"
      target="_blank"
    >
      <q-item-section avatar top>
        <q-avatar
          size="30px"
          font-size="20px"
          color="transparent"
          text-color="primary"
          icon="electric_bolt"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Использовать</q-item-label>
      </q-item-section>
    </q-item>
    <q-item dense class="q-mt-sm text-primary">
      <q-item-section>
        <q-item-label> ID чата/канала </q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      dense
      clickable
      v-close-popup
      href="https://bot-t.com/faq/HELP/telegram_chat_channel_ID"
      target="_blank"
    >
      <q-item-section avatar top>
        <q-avatar
          size="30px"
          font-size="20px"
          color="transparent"
          text-color="primary"
          icon="info"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Инстурукция</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      dense
      clickable
      v-close-popup
      href="https://bot-t.com/link/FIND_MY_ID_BOT"
      target="_blank"
    >
      <q-item-section avatar top>
        <q-avatar
          size="30px"
          font-size="20px"
          color="transparent"
          text-color="primary"
          icon="electric_bolt"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Использовать</q-item-label>
      </q-item-section>
    </q-item>
    <q-item dense class="q-mt-sm text-primary">
      <q-item-section>
        <q-item-label> ID стикера </q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      dense
      clickable
      v-close-popup
      href="https://bot-t.com/faq/HELP/servis_uznat_id_stikera"
      target="_blank"
    >
      <q-item-section avatar top>
        <q-avatar
          size="30px"
          font-size="20px"
          color="transparent"
          text-color="primary"
          icon="info"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Инстурукция</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      dense
      clickable
      v-close-popup
      href="https://bot-t.com/link/FIND_STICKER_ID_BOT"
      target="_blank"
    >
      <q-item-section avatar top>
        <q-avatar
          size="30px"
          font-size="20px"
          color="transparent"
          text-color="primary"
          icon="electric_bolt"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Использовать</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script lang="ts" setup></script>
