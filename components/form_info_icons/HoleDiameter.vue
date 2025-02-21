<template>
  <div class="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" fill="tomato" stroke="none" stroke-width="0" />
      <circle cx="100" cy="100" r="100" fill="black" />

      
      <g transform="rotate(-45, 100, 100)">
        <!-- Arrowhead -->
        <polygon class="arrowhead" points="0,100 50,143 50,57" fill="red" />
        <polygon class="arrowhead" points="200,100 150,143 150,57" fill="red" />

        <!-- Arrow shaft -->
        <line x1="50" y1="100" x2="150" y2="100" stroke="red" stroke-width="20" />
      </g>
    </svg>
</div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>