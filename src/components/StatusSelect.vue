<script setup lang="ts">
import { unfilteredAllTodos } from '@/state/pages/kanban';
  const props = defineProps<{
    status: string,
    cardID: any,
  }>()
  

  function moveTodo(e: any) {
    const newStatus: 'wip' | 'done' | 'backlog' = e.target.value

    if (newStatus === props.status) return false

    // recover the ID of the card that has changed
    // change the value on local of the status
    // change the value of the status on the server

    const selectedTodo = unfilteredAllTodos.value.find(todo => todo.id === props.cardID)
    selectedTodo!.status = newStatus
  }
  
</script>
<template>
<form class="flex max-w-sm mx-auto items-center gap-4">
  <label for="status" class="block text-sm font-medium text-gray-900 dark:text-white">Move to</label>
  <!-- <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> -->
  <select @change="moveTodo" id="status" class=" flex h-10 items-center justify-between rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
    <option value="backlog">Backlog</option>
    <option value="wip">Work in progress</option>
    <option value="done">Done</option>
  </select>
</form>
</template>