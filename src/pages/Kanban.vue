<script setup lang="ts">
import { Todo } from '@/models/todo';
import KanbanSection from '../components/KanbanSection.vue';
import type { Card } from '@/utils/utils'

defineProps<{
  allTodos: Todo[]
}>()

const backlog: Card[] = [
  {
    title: "Slider for spellchecking option",
    description: "More interesting description",
    status: "backlog"
  }
]
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