<script setup lang="ts">
const props = defineProps<{
	todo: Todo;
}>()

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button';
import { TodoController } from '@/controllers/todo';
import { Todo } from '@/models/todo';
import { fetchKanbanData } from '@/state/pages/kanban';


async function deleteTodo() {
  const { todo } = props
  await TodoController.deleteTodo(todo)
  await fetchKanbanData()
}
</script>

<template>
	<Dialog>
		<DialogTrigger>
			<Button size="icon" variant="ghost" class=" hover:bg-red-800">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
			</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Delete todo</DialogTitle>
				<DialogDescription>
					Are you sure you want to DELETE that todo?
				</DialogDescription>
			</DialogHeader>

			<DialogFooter>
				<DialogClose>Cancel</DialogClose>
				<DialogClose>
					<Button @click="deleteTodo" variant="destructive">Delete</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
