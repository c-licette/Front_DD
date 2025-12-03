<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { useRoute } from 'vue-router'
import SideBare from './components/SideBar.vue'
import Menu from './components/Menu.vue'
import { RouterView } from 'vue-router'

const route = useRoute()

const pageHeadings = ref<{ label: string; to?: string }[] | null>(null)

provide('setPageHeadings', (items: { label: string; to?: string }[] | null) => {
  pageHeadings.value = items
})

const sidebarFor = computed(() => {
  if (pageHeadings.value && pageHeadings.value.length > 0) {
    return {
      title: 'Sommaire',
      items: pageHeadings.value
    }
  }
  return {
    title: '',
    items: []
  }
})
</script>

<template>
  <Menu />
  <div class="layout-container">
    <aside class="sidebar">
      <SideBare :items="sidebarFor.items" :title="sidebarFor.title" />
    </aside>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
:root {
  --menu-height: 56px;
  --sidebar-width: 250px;
}

.layout-container {
  display: flex;
  margin-top: var(--menu-height);
  height: calc(100vh - var(--menu-height));
}

.sidebar {
  position: fixed;
  left: 0;
  top: var(--menu-height);
  width: var(--sidebar-width);
  height: calc(100vh - var(--menu-height));
  background: var(--sidebar-bg, #0f0f0f);
  border-right: 1px solid #470f0f;
  overflow-y: auto;
  padding: 1rem;
  z-index: 999;
}

.content {
  margin-left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

:deep(.content > *) {
  max-width: 800px;
  width: 100%;
}
</style>
