<script setup lang="ts">
defineProps<{
	deleteNote: () => Promise<void>;
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

</script>

<template>
	<Dialog>
		<DialogTrigger>
			<Button @click="" variant="destructive">Delete</Button>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Delete note</DialogTitle>
				<DialogDescription>
					Are you sure you want to DELETE that note?
				</DialogDescription>
			</DialogHeader>

			<DialogFooter>
				<DialogClose>Cancel</DialogClose>
				<DialogClose>
					<Button @click="deleteNote" variant="destructive">Delete</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
