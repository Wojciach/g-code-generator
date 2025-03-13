<template>
  <div class="absolute flex justify-center bottom-0 left-0 bg-red-200 w-full h-12">
    <button @click="updateSelectedView('3D')">3D View</button>
    <button @click="updateSelectedView('2D')">2D View</button>
    <button @click="updateSelectedView('Download')">Download</button>
  </div>
</template>

<script setup lang="ts">

defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const updateSelectedView = (newView) => {
  emit('update:modelValue', newView);
};
</script>

<style scoped>
  button {
    @apply px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition;
  }
</style>
