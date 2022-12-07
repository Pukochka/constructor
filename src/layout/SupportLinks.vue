<template>
  <div class="bg-primary flex flex-center">
    <div class="q-pa-md text-white text-center">
      <div class="text-subtitle1">Помощь</div>
      <div class="text-caption">Для улучшения Ваших ботов</div>
    </div>
  </div>
  <q-list padding>
    <q-item dense class="q-mt-sm">
      <q-item-section class="text-primary">
        <q-item-label>Помощь</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      dense
      clickable
      v-close-popup
      href="https://bot-t.com/faq/help"
      target="_blank"
    >
      <q-item-section avatar top>
        <q-avatar
          size="30px"
          font-size="20px"
          color="transparent"
          text-color="secondary"
          icon="forum"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>FAQ</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      dense
      clickable
      v-close-popup
      href="https://www.youtube.com/channel/UCcTigwIzDbNYKm9CQhm4QgQ"
      target="_blank"
    >
      <q-item-section avatar top>
        <q-avatar
          size="30px"
          font-size="20px"
          color="transparent"
          text-color="info"
          icon="movie"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Видео уроки</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      dense
      clickable
      v-close-popup
      href="https://bot-t.com/link/BOTTRU"
      target="_blank"
    >
      <q-item-section avatar top>
        <q-avatar
          size="30px"
          font-size="20px"
          color="transparent"
          text-color="black"
          icon="help"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Поддержка</q-item-label>
      </q-item-section>
    </q-item>
    <q-item dense class="q-mt-sm">
      <q-item-section class="text-primary">
        <q-item-label>Ресурсы</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      dense
      clickable
      v-close-popup
      href="https://t.me/BOTTRU_CHANNEL"
      target="_blank"
    >
      <q-item-section avatar top>
        <q-avatar
          size="30px"
          font-size="20px"
          color="transparent"
          text-color="primary"
          icon="tv"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Канал</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      dense
      clickable
      v-close-popup
      href="https://www.instagram.com/free_telegram_bot/"
      target="_blank"
    >
      <q-item-section avatar top>
        <q-avatar
          size="30px"
          font-size="20px"
          color="transparent"
          text-color="primary"
          icon="center_focus_strong"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Instagram</q-item-label>
      </q-item-section>
    </q-item>
    <q-item
      dense
      clickable
      v-close-popup
      href="https://www.youtube.com/channel/UCcTigwIzDbNYKm9CQhm4QgQ"
      target="_blank"
      class="text-red"
    >
      <q-item-section avatar top>
        <q-avatar size="30px" font-size="20px" color="transparent" icon="smart_display" />
      </q-item-section>
      <q-item-section>
        <q-item-label>YouTube</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script lang="ts" setup></script>
