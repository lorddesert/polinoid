<script setup lang="ts">
  import KanbanSection from '../components/KanbanSection.vue';
</script>
<template>
  <h1>Kanban page</h1>
  <main>
    <KanbanSection title="Backlog" :cards="[]" status="backlog"/>
    <KanbanSection title="W.I.P" :cards="[]"  status="in progress"/>
    <KanbanSection title="Done ✅" :cards="[]" status="done" />
  </main>
</template>

<style>
  main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-content: center;
    gap: 1rem;
  }
</style>