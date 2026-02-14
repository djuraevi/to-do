<script setup lang="ts">
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'
import type { BreadcrumbItem } from '~/types/breadcrumb'

defineProps<{
  title: string
  breadcrumbs: BreadcrumbItem[]
  action?: {
    label: string
    to?: string
    variant?: 'primary' | 'secondary'
  }
}>()
</script>

<template>
  <header class="header">
    <Breadcrumbs :items="breadcrumbs" />

    <div class="header-title">
      <h1>{{ title }}</h1>

      <NuxtLink
          v-if="action?.to"
          class="btn"
          :class="`btn--${action.variant || 'primary'}`"
          :to="action.to"
      >
        {{ action.label }}
      </NuxtLink>
    </div>
  </header>
</template>