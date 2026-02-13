<script setup lang="ts">
import type { Todo } from "~/types/note";

defineProps<{
  todos: Todo[]
}>()

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'remove', id: string): void
}>()
</script>

<template>
  <div>
    <h3>Todo list</h3>

    <div
        v-for="todo in todos"
        :key="todo.id"
        class="card"
        style="display:flex; gap:10px; align-items:center;"
    >
      <input type="checkbox" v-model="todo.completed" />

      <input
          class="input"
          v-model="todo.text"
          placeholder="Todo text"
      />

      <button
          class="button button-danger"
          @click="emit('remove', todo.id)"
      >
        Удалить
      </button>
    </div>

    <button
        class="button button-ghost"
        @click="emit('add')"
    >
      + Добавить пункт
    </button>
  </div>
</template>