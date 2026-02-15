<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useNotesStore } from '~/stores/notes'
import PageHeader from '~/components/layout/PageHeader.vue'
import NoteForm from '~/components/notes/NoteForm.vue'
import { useNoteForm } from '~/composables/useNoteForm'

const route = useRoute()
const store = useNotesStore()

const note = computed(() =>
    store.notes.find(n => n.id === route.params.id)
)

watchEffect(() => {
  if (store.notes.length && !note.value) {
    throw createError({ statusCode: 404 })
  }
})

const {
  title,
  todos,
  errorMessage,
  addTodo,
  removeTodo,
  updateTodoText,
  toggleTodo,
  undo,
  redo,
  save,
  cancel
} = useNoteForm(note.value)

const breadcrumbs = computed(() => [
  { label: 'Главная', to: '/' },
  { label: note.value?.title || 'Заметка' }
])
</script>

<template>
  <PageHeader title="Редактирование" :breadcrumbs/>

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