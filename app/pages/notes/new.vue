<script setup lang="ts">
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'
import NoteForm from '~/components/notes/NoteForm.vue'
import { useNoteForm } from '~/composables/useNoteForm'

const {
  title,
  todos,
  addTodo,
  removeTodo,
  save,
  cancel
} = useNoteForm()

const crumbs = [
  { label: 'Главная', to: '/' },
  { label: 'Новая заметка' }
]
</script>

<template>
  <div class="container">
    <Breadcrumbs :items="crumbs" />

    <h1>Создание заметки</h1>

    <NoteForm
        :title="title"
        :todos="todos"
        @update:title="title = $event"
        @add-todo="addTodo"
        @remove-todo="removeTodo"
        @save="save"
        @cancel="cancel"
    />
  </div>
</template>