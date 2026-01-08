<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'Rechercher...'
  }
})

const emit = defineEmits(['update:modelValue'])

const isExpanded = ref(false)
const localValue = ref(props.modelValue || '')
const input = ref<HTMLInputElement | null>(null)

const emitValue = () => {
  emit('update:modelValue', localValue.value)
}

const handleMouseLeave = () => {
  if (!localValue.value) {
    isExpanded.value = false
  }
}

watch(isExpanded, async (val) => {
  if (val) {
    await nextTick()
    input.value?.focus()
  }
})
</script>

<template>
  <div
    class="search-container"
    :class="{ expanded: isExpanded }"
    @mouseenter="isExpanded = true"
    @mouseleave="handleMouseLeave"
  >
    <MagnifyingGlassIcon class="icon" />
    <input
      v-show="isExpanded"
      ref="input"
      type="text"
      class="search-input"
      :placeholder="placeholder"
      v-model="localValue"
      @focus="isExpanded = true"
      @input="emitValue"
    />
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  width: 48px;
  height: 48px;
  background-color: #FBCEB7;
  border-radius: 999px;
  padding: 0 14px;
  cursor: pointer;
  transition: width 0.3s ease;
  overflow: hidden;
}

.search-container.expanded {
  width: 220px;
}

.icon {
  color: white;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.search-input {
  border: none;
  outline: none;
  background: transparent;
  color: white;
  margin-left: 10px;
  width: 100%;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}
</style>
