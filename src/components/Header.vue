<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
</script>
<template>
	<header>
		<nav>
			<Tabs default-value="/">
				<TabsList class="block h-fit">
					<router-link to="/">
						<TabsTrigger value="/" class=" text-base px-5 py-2">
							<!-- <Button variant="link" class="hover:no-underline"> -->
							Kanban
							<!-- </Button> -->
						</TabsTrigger>
					</router-link>
					<router-link to="/notes">
						<TabsTrigger value="/notes" class=" text-base px-5 py-2">
							Notes
						</TabsTrigger>
					</router-link>
				</TabsList>
			</Tabs>
		</nav>
	</header>
</template>

<style scoped>
header {
	display: grid;
	place-items: center;
	margin-top: 1rem;
}

ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
	display: flex;
	gap: .5rem;
}
</style>
