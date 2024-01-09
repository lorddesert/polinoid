<script setup lang=ts>
	defineProps<{
		card: {
			title: string,
			description: string
		}
	}>()
</script>

<template>
	<Card class="p-2">
		<h2 class="text-base">{{ card.title }}</h2>
		<p class="text-sm text-slate-600">{{ card.description }}</p>
	</Card>
</template>
