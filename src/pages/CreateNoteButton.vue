<script setup lang="ts">
	import { Button } from '@/components/ui/button';

	defineProps<{
		createNote: () => void
	}>()
</script>

<template>
	<Button @click="createNote" variant="outline" class=" rounded-b-none text-center" id="add-new-note-button">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
			stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-circle w-6 h-6">
			<circle cx="12" cy="12" r="10" />
			<path d="M8 12h8" />
			<path d="M12 8v8" />
	</svg>
</Button></template>
