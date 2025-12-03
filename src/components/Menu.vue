<script setup lang="ts">
import { computed } from 'vue'

type MenuItem = {
	label: string
	href?: string
}

const props = defineProps<{
	items?: MenuItem[]
}>()

const menuItems = computed(() => {
	return props.items && props.items.length > 0
		? props.items
		: [
				{ label: 'Acceuil', href: '/' },
				{ label: 'Le Lore', href: '/about' },
				{ label: 'Le Vivant', href: '/contact' },
        { label: 'Les Règles', href: '/contact' },
        { label: 'Le Joueur', href: '/contact' },
        { label: 'Les Objets', href: '/contact' },
			]
})
</script>

<template>
	<nav class="menu" aria-label="Main menu">
		<ul>
			<li v-for="item in menuItems" :key="item.label">
				<a :href="item.href ?? '#'">{{ item.label }}</a>
			</li>
		</ul>
	</nav>
</template>

<style scoped>
.menu {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 56px;
	display: flex;
	align-items: center;
	background: var(--menu-bg, #000000);
	box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
	z-index: 1000;
}

.menu ul {
	list-style: none;
	display: flex;
	gap: 1rem;
	padding: 0 1rem;
	margin: 0;
	justify-content: center;
	align-items: center;
	width: 100%;
}

.menu li {
	margin: 0;
}

.menu a {
	color: inherit;
	text-decoration: none;
	padding: 0.25rem 0.5rem;
	display: inline-block;
}

.menu a:hover {
	opacity: 0.95;
  color: red;
}
</style>

