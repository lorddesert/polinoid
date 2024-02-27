<script setup lang=ts>
import { Card } from '@/components/ui/card';
import StatusSelect from './StatusSelect.vue';
import { Todo } from '@/models/todo';
import { ref } from 'vue';
import DeleteTodoDialog from './DeleteTodoDialog.vue';
import EditTodoDialog from './EditTodoDialog.vue'

defineProps<{
	card: Todo
}>()

const isHoveringCard = ref(false)

const startHoveringCard = () => {
	isHoveringCard.value = true
}
const stopHoveringCard = () => {
	isHoveringCard.value = false
}
</script>

<template>
	<Card 
	 class="p-2 gap-4"
	 >
	 <div v-on:mouseenter="startHoveringCard" v-on:mouseleave="stopHoveringCard">
		 <div class="flex gap-2 content-start place-content-end aria-[expanded=true]:opacity-100 opacity-0 transition-opacity" :class="isHoveringCard && 'opacity-100'">
			 <StatusSelect :isHoveringCard="isHoveringCard" :status="card.status" :cardID="card.id" />
			 <EditTodoDialog :todo="card" />
			<DeleteTodoDialog :todo="card"/>
		 </div>
		 <h2 class="text-base">{{ card.title }}</h2>
		 <p class="text-sm text-slate-600">{{ card.description }}</p>
	 </div>
	</Card>
</template>
