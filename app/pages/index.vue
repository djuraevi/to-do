<script setup lang="ts">
import NoteList from "~/components/notes/NoteList.vue";
import PageHeader from "~/components/layout/PageHeader.vue";

const breadcrumbs = [
  { label: 'Главная', to: '/' }
]
</script>

<template>
  <PageHeader
      title="Заметки"
      :breadcrumbs
      :action="{
          label: '+ Создание заметки',
          to: '/notes/new'
        }"
  />
  <NoteList />
</template>
