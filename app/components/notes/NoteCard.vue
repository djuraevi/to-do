<script setup lang="ts">
import { useNotesStore } from '~/stores/notes'
import type { Note } from '~/types/note'
import TodoList from '~/components/notes/TodoList.vue'

const props = defineProps<{
  note: Note
}>()

const notesStore = useNotesStore()


const removeNote = () => {
  notesStore.deleteNote(props.note.id)
}
</script>

<template>
  <article class="card">
    <h3>{{ note.title }}</h3>

    <TodoList :todos="note.todos" />

    <div class="actions">
      <NuxtLink class="button button-primary" :to="`/notes/${note.id}`">Редактировать</NuxtLink>
      <button class="button button-danger" type="button" @click="removeNote">Удалить</button>
    </div>
  </article>
</template>
