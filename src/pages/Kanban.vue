<script setup lang="ts">
import KanbanSection from '../components/KanbanSection.vue';
import type { Card } from '@/utils/utils'
const backlog: Card[] = [
  {
    title: "Slider for spellcheking option",
    description: "asdasd",
    status: "backlog"
  }
]
</script>
<template>
  <main class="px-4">
    <KanbanSection title="Backlog" :cards="backlog" status="backlog" />
    <KanbanSection title="W.I.P" :cards="[]" status="in progress" />
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