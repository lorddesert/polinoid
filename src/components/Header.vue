<script setup lang="ts">
import Tab from './Tab.vue';

</script>
<template>
	<header>
		<nav>
			<ul>
				<li>
					<Tab to="/">Kanban</Tab>
				</li>
				<li>
					<Tab to="/notes">Notes</Tab>
				</li>
			</ul>
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
