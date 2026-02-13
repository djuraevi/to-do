<script setup lang="ts">
import type { Todo } from '~/types/note'

defineProps<{
  todos: Todo[]
}>()
</script>

<template>
  <ul>
    <li v-for="todo in todos.slice(0, 3)" :key="todo.id">
      {{ todo.text }}
    </li>
  </ul>
</template>