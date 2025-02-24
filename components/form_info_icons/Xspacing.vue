<template>
  <div class="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" :fill="wallColors.top" stroke="none" stroke-width="0" />
      <!-- Arrowhead -->
      <polygon class="arrowhead" points="50,100 85,65 85,135" :fill="colors.arrow" stroke="black" stroke-width="5" />
      <polygon class="arrowhead" points="150,100 115,65 115,135" :fill="colors.arrow" stroke="black" stroke-width="5" />
      <!-- Arrow shaft -->
      <line x1="82" y1="100" x2="119" y2="100" :stroke="colors.arrow" stroke-width="19" />
      <line x1="82.5" y1="110" x2="117.5" y2="110" stroke="black" stroke-width="5" />
      <line x1="82.5" y1="90" x2="117.5" y2="90" stroke="black" stroke-width="5" />

      <circle cx="15" cy="100" r="35" :fill="colors.hole" />
      <circle cx="185" cy="100" r="35" :fill="colors.hole" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { wallColors } from '@/utils/wallColors';
import { colors } from '@/utils/colors';

</script>

<style>
.arrowhead {
  transform-origin: center center;
}

</style>