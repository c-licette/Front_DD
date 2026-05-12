<script setup lang="ts">
import { computed } from 'vue'

type MenuItem = {
	label: string
	href?: string
	children?: MenuItem[]
}

const props = defineProps<{
	items?: MenuItem[]
}>()

const menuItems = computed(() => {
	return props.items && props.items.length > 0
		? props.items
		: [
				{ label: 'Accueil', href: '/' },
				{ label: 'Lore', href: '/lore' },
				{
					label: 'Le Vivant',
					href: '/vivant',
					children: [
						{ label: 'Races', href: '/vivant/races' },
						{ label: 'Classes', href: '/vivant/classes' },
						{ label: 'Compagnons', href: '/vivant/compagnons' },
						{ label: 'Bestiaire', href: '/vivant/bestiaire' }
					]
				},
				{ label: 'Règles', href: '/regles' },
				{
					label: 'Joueur',
					href: '/joueur',
					children: [
						{ label: 'Créer une Fiche', href: '/joueur/creation' },
						{ label: 'Fiches Joueurs', href: '/joueur/bibliotheque' },
            { label: 'Fiches Communautés', href: '/joueur/commu' }


          ]
				},
				{
					label: 'Objets',
					href: '/objets',
					children: [
						{ label: 'Équipements', href: '/objets/equipements' },
						{ label: 'Objets Magiques', href: '/objets/magique' },
						{ label: 'Sorts', href: '/objets/sorts' }
					]
				}
			]
})
</script>

<template>
<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet">
	<nav class="menu" aria-label="Main menu">
		<ul class="menu-list">
			<li v-for="item in menuItems" :key="item.label" class="menu-item" :class="{ 'has-submenu': item.children }">
				<router-link :to="item.href ?? '#'" class="menu-link">{{ item.label }}</router-link>
				<ul v-if="item.children" class="submenu">
					<li v-for="child in item.children" :key="child.label" class="submenu-item">
						<router-link :to="child.href ?? '#'" class="submenu-link">{{ child.label }}</router-link>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
	<img id="menu-logo" src="../assets/logo.png">
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
    background: /*var(--menu-bg, #000000)*/ rgba(255,255,255,0);
    /*box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);*/
    z-index: 1000;
    overflow: visible; /* allow dropdowns to be visible outside the nav */
}

.menu-list {
    list-style: none;
    display: flex;
    gap: 1rem;
    padding: 5vw;
    margin: 0;
    /*justify-content: center;*/
    align-items: center;
    width: 100%;
}

.menu-item {
    margin: 0;
    position: relative;
}

.menu-link {
    color: #D86C9D; /* ensure contrast on dark menu */
    font-family: "Instrument Sans", serif;
    text-decoration: none;
    font-weight: bold;
    padding: 0.25rem 0.5rem;
    display: inline-block;
    transition: all 0.2s ease;
}

.menu-link:hover {
    opacity: 0.95;
    color: palevioletred;
}

.menu-link:focus,
.menu-link:focus-visible,
.submenu-link:focus,
.submenu-link:focus-visible {
    outline: 2px solid #D86C9D;
    border-radius: 6px;
}
/* Submenu styles */
.submenu {
    list-style: none;
    position: absolute;
    top: 100%;
    left: 0;
    background: rgba(0, 0, 0, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-top: none;
    padding: 0.5rem 0;
    margin: 0;
    min-width: 180px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    z-index: 1001;
    pointer-events: none;
}

.menu-item.has-submenu:hover .submenu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
}

.submenu-item {
    margin: 0;
    padding: 0;
}

.submenu-link {
    color: #D86C9D;
    text-decoration: none;
    font-weight: bold;
    padding: 0.5rem 1rem;
    display: block;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.submenu-link:hover {
    background: rgba(255, 255, 255, 0.1);
    color: palevioletred;
    padding-left: 1.2rem;
}

#menu-logo {
    width: 25vw;
    height: 10vw;
    position: fixed;
    top: 0;
    right: -1vw;
}
</style>
