<script setup lang="ts">
import { useNotesStore } from '~/stores/notes'
import NoteCard from "~/components/notes/NoteCard.vue";
const notesStore = useNotesStore()
</script>

<template>
  <template v-if="notesStore.notes">
    <h2>У вас нет заметок</h2>
  </template>
  <template v-else>
    <h2>Текущие заметки</h2>
    <div
        v-for="note in notesStore.notes"
        :key="note.id"
        :note="note"
    >
      <NoteCard :note="note" />
    </div>
  </template>

</template>
