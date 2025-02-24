<template>
  <div class="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" :fill="wallColors.top" stroke="none" stroke-width="0" />
      <circle cx="100" cy="100" r="100" fill="black" />
      <g transform="rotate(-45, 100, 100)">
        <!-- Arrowhead -->
        <polygon class="arrowhead" points="0,100 50,143 50,57" :fill="colors.arrow" />
        <polygon class="arrowhead" points="200,100 150,143 150,57" :fill="colors.arrow" />

        <!-- Arrow shaft -->
        <line x1="50" y1="100" x2="150" y2="100" :fill="colors.arrow" :stroke="colors.arrow" stroke-width="20" />
      </g>
    </svg>
</div>
</template>

<script lang="ts" setup>
import { wallColors } from '@/utils/wallColors';
import { colors } from '@/utils/colors';

</script>

<style>

</style>