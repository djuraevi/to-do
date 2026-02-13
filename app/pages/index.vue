<script setup lang="ts">
import Breadcrumbs from "~/components/ui/Breadcrumbs.vue";
import NoteList from "~/components/notes/NoteList.vue";

const crumbs = [
  { label: 'Главная', to: '/' }
]
</script>

<template>
  <div>
    <header class="header">
      <Breadcrumbs :items="crumbs"/>
      <div class="header-title">
        <h1>Заметки</h1>
        <NuxtLink class="button button-ghost" type="button"  to="/notes/new">+ Создание заметки</NuxtLink>
      </div>

    </header>
    <NoteList />
  </div>
</template>
<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>