<template>
  <div class="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" fill="tomato" stroke="none" stroke-width="0" />
      <!-- Arrow shaft -->
      <line x1="0" y1="100" x2="200" y2="100" stroke="red" stroke-width="4" />
      <!-- Walls -->
      <line x1="6" y1="0" x2="6" y2="200" stroke="black" stroke-width="12" />
      <line x1="194" y1="0" x2="194" y2="200" stroke="black" stroke-width="12" />
      <!-- Arrowhead -->
      <polygon class="arrowhead" points="150,100 140,95 140,105" fill="red" transform="translate(-60, 0) scale(3)"/>
      <polygon class="arrowhead" points="150,100 140,95 140,105" fill="red" transform="translate(60, 0) rotate(180, 0, 0) scale(3)"/>
      <circle cx="100" cy="100" r="20" fill="black" />
    </svg>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>