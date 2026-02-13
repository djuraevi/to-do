<script setup lang="ts">
import TodoEditor from './TodoEditor.vue'
import type { Todo } from "~/types/note";

defineProps<{
  title: string
  todos: Todo[]
}>()

const emit = defineEmits<{
  (e: 'update:title', value: string): void
  (e: 'add-todo'): void
  (e: 'remove-todo', id: string): void
  (e: 'save'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <div class="card">
    <input
        class="input"
        :value="title"
        @input="emit('update:title', $event.target.value)"
        placeholder="Название заметки"
    />

    <TodoEditor
        :todos="todos"
        @add="emit('add-todo')"
        @remove="emit('remove-todo', $event)"
    />

    <div style="margin-top:16px; display:flex; gap:10px;">
      <button
          class="button button-primary"
          @click="emit('save')"
      >
        Сохранить
      </button>

      <button
          class="button button-ghost"
          @click="emit('cancel')"
      >
        Отменить
      </button>
    </div>
  </div>
</template>