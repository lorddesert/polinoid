<script setup lang="ts">
import KanbanSection from '../components/KanbanSection.vue';
import { fetchKanbanData, todos, dataHasLoaded } from "@/state/pages/kanban"
import { onMounted } from 'vue';
onMounted(() => {
  if (!dataHasLoaded.value)
    fetchKanbanData()
})

</script>
<template>
  <main class="px-4">
    <KanbanSection title="Backlog" :cards="todos.backlog" status="backlog" />
    <KanbanSection title="W.I.P" :cards="todos.wip" status="wip" />
    <KanbanSection title="Done ✅" :cards="todos.done" status="done" />
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