<script setup lang="ts">
import type { Todo } from '~/types/note'
defineProps<{
  todos: Todo[]
}>()

</script>

<template>
  <ul class="card-list">
    <li
        v-for="todo in todos.slice(0, 3)"
        :key="todo.id"
        :class="['card-item', todo.completed ? 'card-item--completed' : '']"
    >
      {{ todo.text }}
    </li>
  </ul>
</template>