<template>
  <div class="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" :fill="wallColors.top" stroke="none" stroke-width="0" />
      <!-- Arrow shaft -->
      <line x1="64" y1="100" x2="136" y2="100" :stroke="colors.arrow" stroke-width="22" />
      <!-- Walls -->
      <line x1="6" y1="0" x2="6" y2="200" :stroke="colors.walls" stroke-width="12" />
      <line x1="194" y1="0" x2="194" y2="200" :stroke="colors.walls" stroke-width="12" />
      <!-- Arrowheads -->
      <polygon class="arrowhead" points="14,100 54,145 54,55" :fill="colors.arrow" />
      <polygon class="arrowhead" points="186,100 146,145 146,55" :fill="colors.arrow" />
      <circle cx="100" cy="100" r="35" :fill="colors.walls" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { wallColors } from '@/utils/wallColors';
import { colors } from '@/utils/colors';

</script>

<style>

</style>