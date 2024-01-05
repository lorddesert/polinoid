<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Tab from './Tab.vue';

</script>
<template>
	<header>
		<nav>
			<Tabs default-value="/">
				<TabsList>
					<router-link to="/">
						<TabsTrigger value="/">
							Kanban
						</TabsTrigger>
					</router-link>
					<router-link to="/notes">
						<TabsTrigger value="/notes">
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
}

ul {
	list-style-type: none;
	margin: 0;
	padding: 0;
	display: flex;
	gap: .5rem;
}
</style>
