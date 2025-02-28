<template>
    <div class="fixed inset-0 w-full h-full z-[-1]" :style="{ backgroundColor: 'transparent' }">
      <svg class="bg-transparent w-full h-full">
        <defs>
          <pattern id="grid" :width="gridFactor" :height="gridFactor" patternUnits="userSpaceOnUse">
            <!-- Vertical Line (corrected) -->
            <line :x1="gridFactor" y1="0" :x2="gridFactor" :y2="gridFactor" stroke="skyblue" stroke-width="1"/>
            <!-- Horizontal Line (corrected) -->
            <line x1="0" :y1="gridFactor" :x2="gridFactor" :y2="gridFactor" stroke="skyblue" stroke-width="1"/>
          </pattern>
        </defs>
        <!-- Apply the pattern -->
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>
    </div>
</template>

<script lang="ts" setup>

  const props = defineProps<{
    gridFactor: number;
  }>();

</script>

<style>

</style>