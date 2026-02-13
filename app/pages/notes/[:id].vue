<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useNotesStore } from '~/stores/notes'
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'
import NoteForm from '~/components/notes/NoteForm.vue'
import { useNoteForm } from '~/composables/useNoteForm'

const route = useRoute()
const notesStore = useNotesStore()

const note = computed(() =>
    notesStore.notes.find(n => n.id === route.params.id)
)

if (!note.value) {
  throw createError({ statusCode: 404 })
}

const {
  title,
  todos,
  addTodo,
  removeTodo,
  save,
  cancel
} = useNoteForm(note.value)

const crumbs = computed(() => [
  { label: 'Главная', to: '/' },
  { label: note.value?.title || 'Заметка' }
])
</script>

<template>
  <div class="container">
    <Breadcrumbs :items="crumbs" />

    <h1>Редактирование</h1>

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