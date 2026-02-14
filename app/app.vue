<script setup lang="ts">
import { useNotesPersistence } from '~/composables/useNotesPersistence'

useNotesPersistence()
</script>

<template>
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ClientOnly>
</template>
