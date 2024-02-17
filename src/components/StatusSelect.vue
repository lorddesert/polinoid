<script setup lang="ts">
  defineProps<{
    status: string
  }>()

  const KANBAN_STATUS_OPTIONS = {
    BACKLOG: 'backlog',
    WORK_IN_PROGRESS: 'wip',
    DONE: 'done'
  }
  
</script>
<template>
<form class="max-w-sm mx-auto">
  <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Move to</label>
  <!-- <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"> -->
  <select id="status" class="mb-2 flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
    <option value="backlog" :selected="status === KANBAN_STATUS_OPTIONS.BACKLOG">Backlog</option>
    <option value="wip" :selected="status === KANBAN_STATUS_OPTIONS.WORK_IN_PROGRESS">Work in progress</option>
    <option value="done" :selected="status === KANBAN_STATUS_OPTIONS.DONE">Done</option>
  </select>
</form>
</template>