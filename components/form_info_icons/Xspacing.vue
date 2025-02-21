<template>
  <div class="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" fill="tomato" stroke="none" stroke-width="0" />
      <!-- Arrow shaft -->
      <line x1="85" y1="100" x2="135" y2="100" stroke="red" stroke-width="29" />
      <!-- Arrowhead -->
      <polygon class="arrowhead" points="50,100 85,65 85,135" fill="red" />
      <polygon class="arrowhead" points="150,100 115,65 115,135" fill="red" />
      <circle cx="15" cy="100" r="35" fill="black" />
      <circle cx="185" cy="100" r="35" fill="black" />
    </svg>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.arrowhead {
  transform-origin: center center;
}

</style>