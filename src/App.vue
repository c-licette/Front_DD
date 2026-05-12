<script setup lang="ts">
import { computed, provide, ref } from 'vue'
//import { useRoute } from 'vue-router'
import SideBare from './components/SideBar.vue'
import Menu from './components/MenuList.vue'
import SearchBar from './components/SearchBar.vue'
import { RouterView } from 'vue-router'

//const route = useRoute()

const pageHeadings = ref<{ label: string; to?: string }[] | null>(null)

provide('setPageHeadings', (items: { label: string; to?: string }[] | null) => {
  pageHeadings.value = items
})

const activeHeadingId = ref<string | null>(null);

const setActiveHeadingId = (id: string | null) => {
  activeHeadingId.value = id;
};

provide('setActiveHeadingId', setActiveHeadingId);

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
  <header class="top-bar">
    <Menu />
    <SearchBar v-model="search"
    class="search-fixed"/>
  </header>

  <div class="layout-container">
    <aside class="sidebar" v-if="$route.path !== '/'">
      <SideBare :items="sidebarFor.items" :title="sidebarFor.title" :activeId="activeHeadingId" />
    </aside>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>
<style scoped>
.menu-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
}

:root {
  --menu-height: 56px;
  --sidebar-width: 250px;
}

/* 🔝 Barre du haut */
.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  height: var(--menu-height);
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 16px;
  z-index: 1000;
}
.search-fixed {
  position: fixed;
  top: 1vw;              /* ajuste verticalement */
  right: 13vw;           /* collée à droite */
  z-index: 1100;
}

/* layout principal */
.layout-container {
  margin-top: var(--menu-height);
  height: calc(100vh - var(--menu-height));
}

.sidebar {
  position: fixed;
  left: 0;
  margin-left: 3vw;
  margin-top: 3vw;
  top: var(--menu-height);
  width: var(--sidebar-width);
  height: calc(100vh - var(--menu-height));
  background: var(--menu-background);
  border-right: none;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1rem;
  z-index: 999;
  border-radius: 1vw;
}

.content {
  margin-left: var(--sidebar-width);
  padding: 2rem;
}
</style>
