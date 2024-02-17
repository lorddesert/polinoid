<script setup lang=ts>
import { Card } from '@/components/ui/card';
import StatusSelect from './StatusSelect.vue';
import { Todo } from '@/models/todo';
defineProps<{
	card: Todo
}>()

</script>

<template>
	<Card class="p-2 gap-4">
		<StatusSelect :status="card.status" />
		<h2 class="text-base">{{ card.title }}</h2>
		<p class="text-sm text-slate-600">{{ card.description }}</p>
	</Card>
</template>
