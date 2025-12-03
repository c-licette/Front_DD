<script setup lang="ts">
import type { PropType } from 'vue'

type Item = { label: string; to?: string }

const props = defineProps<{
  items?: Item[]
  title?: string
}>()
</script>

<template>
  <div class="sidebar-content">
    <h3>{{ props.title ?? 'Navigation' }}</h3>
    <ul>
      <li v-if="!props.items || props.items.length === 0"></li>
      <li v-for="it in props.items" :key="it.label">
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
  margin: 0.25rem 0;
}

a.router-link-active {
  font-weight: 600;
}
</style>
