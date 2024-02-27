<script setup lang="ts">
import { TodoController } from '@/controllers/todo';
import { unfilteredAllTodos } from '@/state/pages/kanban';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ref, watch } from 'vue';
  const props = defineProps<{
    status: "wip" | "backlog" | "done",
    cardID: any,
    isHoveringCard: boolean
  }>()

  const selectValue = ref(props.status)

  watch(selectValue, (prev, current) => {
    if (!current) return
    if (prev === current) return
    
    moveTodo(selectValue.value)
  })
  

  function moveTodo(newStatus: 'wip' | 'done' | 'backlog') {
    if (newStatus === props.status) return false

    const selectedTodo = unfilteredAllTodos.value.find(todo => todo.id === props.cardID)
    selectedTodo!.status = newStatus

    // @ts-ignore
    TodoController.modifyTodo(selectedTodo)
  }
</script>
<template>
  <Select v-model="selectValue" :default-value="props.status">
    <SelectTrigger class=" w-min">
      <SelectValue placeholder="Move to" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Status</SelectLabel>
        <SelectItem value="backlog">
          Backlog
        </SelectItem>
        <SelectItem value="wip">
          Work in progress
        </SelectItem>
        <SelectItem value="done">
          Done
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>