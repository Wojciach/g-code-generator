<template>
  <div class="w-full h-full">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect x="0" y="0" width="200" height="200" fill="none" />

      <g class="wholeGroup" transform="scale(1, 0.9)">
        <!-- Material representation -->
        <rect x="0" y="25" width="75" height="150" fill="none" stroke="none" stroke-width="22" />
        
        <!-- Dashed Lines -->
        <!-- TOP -->
        <line x1="80" y1="25" x2="170" y2="25" stroke="black" stroke-width="12" stroke-dasharray="16,16" />
        <!-- BOTTOM -->
        <line x1="80" y1="175" x2="170" y2="175" stroke="black" stroke-width="12" stroke-dasharray="16,16" />
        <!-- Arrow -->
        <g class="arrow" transform="translate(-15,0) scale(0.8)">
          <!-- Arrowheads -->
          <polygon points="150,60 200,0 250,60" :fill="colors.arrow" stroke="black" stroke-width="7"/>
          <polygon points="150,140 250,140 200,200" :fill="colors.arrow" stroke="black" stroke-width="7"/>
          <!-- Arrow shaft -->
          <line x1="200" y1="50" x2="200" y2="150" :stroke="colors.arrow" stroke-width="40" />
          <line x1="180" y1="60" x2="180" y2="140" stroke="black" stroke-width="6" />
          <line x1="220" y1="60" x2="220" y2="140" stroke="black" stroke-width="6" />
        </g>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { colors } from '@/utils/colors'


</script>

<style scoped>
  .arrow {
    transform-origin: center;
  }

  .wholeGroup {
    transform-origin: center;
  }
</style>