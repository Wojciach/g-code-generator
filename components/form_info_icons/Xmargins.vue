<template>
  <div class="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" fill="tomato" stroke="none" stroke-width="0" />
      <!-- Arrow shaft -->
      <line x1="64" y1="100" x2="136" y2="100" stroke="red" stroke-width="22" />
      <!-- Walls -->
      <line x1="12" y1="0" x2="12" y2="200" stroke="black" stroke-width="24" />
      <line x1="188" y1="0" x2="188" y2="200" stroke="black" stroke-width="24" />
      <!-- Arrowhead -->
      <polygon class="arrowhead" points="24,100 64,145 64,55" fill="red" />
      <polygon class="arrowhead" points="176,100 136,145 136,55" fill="red" />
      <circle cx="100" cy="100" r="35" fill="black" />
    </svg>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>