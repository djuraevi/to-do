<script setup lang="ts">
import { useNotesStore } from '~/stores/notes'
import NoteCard from "~/components/notes/NoteCard.vue";
const notesStore = useNotesStore()
</script>

<template>
  <div
      :class="['note-list', notesStore.notes.length === 0 ? 'note-list--void' : '']"
  >
    <template v-if="notesStore.notes.length === 0">
      <h2>У вас нет заметок</h2>
    </template>
    <template  v-else>
      <h2>Текущие заметки</h2>
      <div class="notes-grid">
        <NoteCard
            v-for="note in notesStore.notes"
            :key="note.id"
            :note="note"
        />
      </div>
  </template>
  </div>
</template>
