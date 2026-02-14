<script setup lang="ts">
import { ref } from 'vue'
import { useNotesStore } from '~/stores/notes'
import BaseModal from '~/components/ui/BaseModal.vue'
import type { Note } from '~/types/note'
import TodoList from "~/components/notes/TodoList.vue";

const props = defineProps<{ note: Note }>()
const store = useNotesStore()

const showDeleteModal = ref(false)

const confirmDelete = () => {
  store.deleteNote(props.note.id)
}
</script>

<template>
  <article class="card">
    <h3>{{ note.title }}</h3>

    <TodoList :todos="note.todos" />

    <div class="card-action">
      <NuxtLink class="btn btn--secondary" :to="`/notes/${note.id}`">Редактировать</NuxtLink>
      <button
          class="btn btn--delete"
          @click="showDeleteModal = true"
      >
        Удалить
      </button>

      <BaseModal
          v-model="showDeleteModal"
          :title="note.title"
          @confirm="confirmDelete"
      >
        Вы действительно хотите удалить эту заметку?
      </BaseModal>
    </div>
  </article>
</template>
