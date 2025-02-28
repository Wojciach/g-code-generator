<template>
  <div class="w-full h-full flex items-center justify-center">
    <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Arrowhead -->
      <!-- <polygon points="10,100 90,10 90,190" :fill="colors.arrow" stroke="black" stroke-width="6" /> -->
      <path
        d="M 90,10
          L 20,100
          A 20,20 0 0 0 20,110
          L 90,190
          A 5,5 0 0 0 95,185
          L 95,15
          A 5,5 0 0 0 90,10
          Z"
        :fill="colors.arrow"
        stroke="darkgray"
        stroke-width="6"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { wallColors } from '@/utils/wallColors';
import { colors } from '@/utils/colors';

</script>

<style>

</style>