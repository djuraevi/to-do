<script setup lang="ts">
import PageHeader from '~/components/layout/PageHeader.vue'
import NoteForm from '~/components/notes/NoteForm.vue'
import { useNoteForm } from '~/composables/useNoteForm'

const {
  title,
  todos,
  errorMessage,
  addTodo,
  removeTodo,
  updateTodoText,
  toggleTodo,
  save,
  cancel,
  undo,
  redo
} = useNoteForm()
const breadcrumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Новая заметка' }
]

</script>

<template>
  <PageHeader title="Создание заметки" :breadcrumbs />

  <NoteForm
      :title="title"
      :todos="todos"
      :error="errorMessage"
      @update:title="val => title = val"
      @undo="undo"
      @redo="redo"
      @add-todo="addTodo"
      @remove-todo="removeTodo"
      @update-todo-text="updateTodoText"
      @toggle-todo="toggleTodo"
      @save="save"
      @cancel="cancel"
  />
</template>