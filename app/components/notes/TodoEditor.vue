<script setup lang="ts">
import type { Todo } from '~/types/note'

defineProps<{ todos: Todo[] }>()

const emit = defineEmits<{
  (e: 'add-todo'): void
  (e: 'remove', id: string): void
  (e: 'update-text', payload: { id: string; text: string }): void
  (e: 'toggle', id: string): void
}>()
</script>

<template>
  <div class="todo-editor">
    <div
        v-for="todo in todos"
        :key="todo.id"
        class="todo-editor__item"
    >
      <input
          type="checkbox"
          class="ui-checkbox"
          :checked="todo.completed"
          @change="emit('toggle', todo.id)"
      />

      <input
          class="input"
          :value="todo.text"
          @input="emit('update-text', { id: todo.id, text: $event.target.value })"
      />

      <button
          class="btn btn--delete"
          @click="emit('remove', todo.id)"
      >
        Удалить
      </button>
    </div>

    <button class="btn btn--primary" @click="emit('add-todo')">
      + Добавить пункт
    </button>
  </div>
</template>