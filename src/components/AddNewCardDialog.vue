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
import { ref } from 'vue';

const hasSubmitted = ref(false)


async function addNewCard(e: any) {
	e.preventDefault()
	const form = e.target
	const newTodo = {
		title: form[0].value,
		status: form[2].value,
		description: form[3].value
	}

	try {
		// @ts-ignore
		await TodoController.createTodo(newTodo)
		await fetchKanbanData()
	} catch (e) {
		console.log(e)

		toast({
			variant: 'destructive',
			title: 'ERR: when creating card! See the console for more details.',
		})
	}

	toast({
		title: 'Card created!',
		type: 'foreground'
	})

	// setTimeout(() => {

	// hasSubmitted.value = true

	// }, 300)

	/* 
		KabanController.createCard(cardInfo)
		KanbanController.getAllCards()

		updateCards() // get all the cards again, instead of just this group. There will be no much for now, so no problem.
	*/
}

function resetSubmitted() {
	hasSubmitted.value = false
}
</script>


<!-- 

	We can re render the form to say that has been submitted succesfully, or, render the form errors.

	Actually, we should do the correct form that shadcn-vue recommends.
 -->

<template>
	<Dialog>
		<DialogTrigger class="mx-auto w-full block">
			<Button variant="ghost" size="lg" class="text-lg mx-auto block w-full">Add new card</Button>
		</DialogTrigger>
		<DialogContent v-if="!hasSubmitted">
			<form action="" class="grid gap-2" v-on:submit="addNewCard">
				<label for="note-title">Note title</label>
				<Input required type="text" name="note-title" id="note-title" placeholder="Awesome thing!" />
				<label for="note-status">Status</label>
				<Select required>
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
								In progress
							</SelectItem>
							<SelectItem value="done">
								Done
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<label for="note-body">Note body</label>
				<Textarea name="note-body" id="note-body" cols="30" rows="10" placeholder="Super history"></Textarea>
				<DialogFooter>
					<DialogClose>
						Cancel
					</DialogClose>

					<Button type="submit">Create it!</Button>
				</DialogFooter>
			</form>
		</DialogContent>
		<DialogContent v-else>
			<DialogTitle>
				<h2>Yey ✨</h2>
			</DialogTitle>
			
			<p>You can now close this view.</p>
			<DialogFooter>
				<DialogClose>
					<Button @click="resetSubmitted">Close</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
