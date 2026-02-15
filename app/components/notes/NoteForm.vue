<script setup lang="ts">
import TodoEditor from './TodoEditor.vue'
import BaseModal from '~/components/ui/BaseModal.vue'
import type { Todo } from '~/types/note'

defineProps<{
  title: string
  todos: Todo[]
  error: string | null
}>()

const emit = defineEmits<{
  (e: 'update:title', value: string): void
  (e: 'add-todo'): void
  (e: 'remove-todo', id: string): void
  (e: 'update-todo-text', payload: { id: string; text: string }): void
  (e: 'toggle-todo', id: string): void
  (e: 'save'): void
  (e: 'cancel'): void
  (e: 'undo'): void
  (e: 'redo'): void
}>()

const showCancelModal = ref(false)

const confirmCancel = () => {
  emit('cancel')
}
</script>

<template>
  <div class="note-form">
    <div class="note-form__actions">
      <button class="btn btn--secondary" @click="emit('undo')">Undo</button>
      <button class="btn btn--secondary" @click="emit('redo')">Redo</button>
    </div>

    <div class="note-form__section">
      <h2>Основная информация</h2>

      <input
          class="input"
          :class="{ 'input--error': error }"
          :value="title"
          @input="emit('update:title', $event.target.value)"
          placeholder="Название заметки"
      />

      <p v-if="error" class="error-text">
        {{ error }}
      </p>
    </div>

    <div class="note-form__section">
      <h2>Список задач</h2>

      <TodoEditor
          :todos="todos"
          @add-todo="emit('add-todo')"
          @remove="emit('remove-todo', $event)"
          @update-text="emit('update-todo-text', $event)"
          @toggle="emit('toggle-todo', $event)"
      />
    </div>

    <div class="note-form__actions">
      <button class="btn btn--primary" @click="emit('save')">
        Сохранить
      </button>

      <button class="btn btn--secondary" @click="showCancelModal = true">
        Отменить
      </button>
    </div>

    <BaseModal
        v-model="showCancelModal"
        title="Отменить редактирование?"
        @confirm="confirmCancel"
    >
      Все несохранённые изменения будут потеряны.
    </BaseModal>

  </div>
</template>