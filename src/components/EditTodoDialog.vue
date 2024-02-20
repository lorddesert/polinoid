<script setup lang="ts">
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogClose,

} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from './ui/toast';
import { TodoController } from '@/controllers/todo';
import { fetchKanbanData } from '@/state/pages/kanban';
import { Todo } from '@/models/todo';

const props = defineProps<{
  todo: Todo
}>()

async function modifyTodo(e: any) {
	const form = e.target
	const newTodo = {
    id: props.todo.id,
		title: form[0].value,
		status: form[2].value,
		description: form[3].value
	}

	try {
		// @ts-ignore
		await TodoController.modifyTodo(newTodo)
		await fetchKanbanData()
	} catch(e) {
		console.log(e)

		toast({
			variant: 'destructive',
			title: 'ERR: when creating card!'
		})
	}

  toast({
    title: 'Card modified!',
    type: 'foreground'
  })
  /* 
    KabanController.createCard(cardInfo)
    KanbanController.getAllCards()

    updateCards() // get all the cards again, instead of just this group. There will be no much for now, so no problem.
  */
}
</script>

<template>
	<Dialog>
	      <DialogTrigger class="block">
          <Button variant="ghost" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
          </Button>
	      </DialogTrigger>
	      <DialogContent>
	        <form action="" class="grid gap-2" @submit.prevent="modifyTodo">
	          <label for="note-title">Note title</label>
	          <Input type="text" name="note-title" id="note-title" placeholder="Awesome thing!" :default-value="todo.title" />
	          <label for="note-status">Status</label>
	          <Select :default-value="todo.status">
	            <SelectTrigger>
	              <SelectValue placeholder="Where it should go?" />
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
	          <label for="note-body">Note body</label>
	          <Textarea name="note-body" id="note-body" cols="30" rows="10" placeholder="Super history" :default-value="todo.description"></Textarea>
	          <DialogFooter>
	            <DialogClose>
	              Cancel
	            </DialogClose>
	            <DialogClose>
	              <Button type="submit">Modify</Button>
	            </DialogClose>
	          </DialogFooter>
	        </form>
	      </DialogContent>
	    </Dialog>
</template>
