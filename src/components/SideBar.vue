<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

type Item = { label: string; to?: string }

const props = defineProps<{
  items?: Item[]
  title?: string
  activeId?: string | null
}>()

const route = useRoute()
const pageClass = computed(() => {
  if (route.path === '/lore' || route.path === '/regles') {
    return 'page-lore-regles'
  }
  if (route.path.startsWith('/vivant')) {
    return 'page-vivant'
  }
  return ''
})
</script>

<template>
  <div class="sidebar-content" :class="pageClass">
    <!--<h3>{{ props.title ?? 'Navigation' }}</h3>-->
    <ul>
      <li v-if="!props.items || props.items.length === 0"></li>
      <li v-for="it in props.items" :key="it.label" :class="{ active: it.to === `#${props.activeId}` }">
        <a v-if="it.to && it.to.startsWith('#')" :href="it.to">{{ it.label }}</a>
        <router-link v-else-if="it.to" :to="it.to">{{ it.label }}</router-link>
        <span v-else>{{ it.label }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar-content {
  position: relative;
  padding: 1rem;
  margin: 0;
  background-color: var(--menu-background);
  border-radius: 30px;
  overflow: hidden;
}

h3 {
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  padding: 0.25rem 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 1vw 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
}

.sidebar-content a,
.sidebar-content a:visited,
.sidebar-content a:hover,
.sidebar-content a:active {
  color: inherit;
  text-decoration: none;
}

.sidebar-content.page-lore-regles li:not(.active) a,
.sidebar-content.page-lore-regles li:not(.active) a:visited {
  color: black;
}

.sidebar-content.page-vivant li a,
.sidebar-content.page-vivant li a:visited {
  color: black;
}

.sidebar-content.page-vivant li.active > *,
.sidebar-content.page-vivant li.active > a {
  color: black;
}

a.router-link-active {
  font-weight: 600;
}

li.active {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% + 1.25rem);
  margin-left: -0.7rem;
  padding: 1vw 0.65rem;
  background-color: var(--color-background);
  color: var(--color-text);
  border-top-left-radius: 9999px;
  border-bottom-left-radius: 9999px;
  overflow: visible;
}

li.active::after {
  content: "";
  position: absolute;
  top: 0;
  right: -0.9rem;
  width: 0.9rem;
  height: 100%;
  background-color: var(--color-background);
  border-top-right-radius: 9999px;
  border-bottom-right-radius: 9999px;
}

li.active > * {
  color: var(--color-text);
  text-align: center;
  width: 100%;
}

</style>
