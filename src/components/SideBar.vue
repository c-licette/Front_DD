<script setup lang="ts">
import type { PropType } from 'vue'

type Item = { label: string; to?: string }

const props = defineProps<{
  items?: Item[]
  title?: string
  activeId?: string | null
}>()
</script>

<template>
  <div class="sidebar-content">
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
  padding: 0;
  margin: 0;
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
}

a.router-link-active {
  font-weight: 600;
}

li.active {
  background-color: var(--menu-selected-back);
  clip-path: shape(from 1vw 0.5vw,
      hline by 10vw,
      curve to 12.7vw 0vw with 12vw 0.5vw,
      vline by 4vw,
      curve to 11.5vw 3vw with 13vw 3vw,
      hline by -10.5vw,
      curve to 0vw 1.75vw with 0.2vw 2.9vw,
      curve to 1vw 0.5vw with 0.1vw 0.7vw,
    close);
  background-repeat: no-repeat;
  background-size: cover;
  width: calc(100% + 1.2vw);
}

li.active > * {
  color: var(--menu-selected-color);
}

</style>
