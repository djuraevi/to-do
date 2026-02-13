<script setup lang="ts">
import type { BreadcrumbItem } from '~/types/breadcrumb'

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <nav class="breadcrumbs">
    <span
        v-for="(item, index) in items"
        :key="index"
    >
      <NuxtLink
          v-if="item.to && index !== items.length - 1"
          :to="item.to"
          class="link"
      >
        {{ item.label }}
      </NuxtLink>

      <span v-else>
        {{ item.label }}
      </span>

      <span v-if="index !== items.length - 1">
        /
      </span>
    </span>
  </nav>
</template>