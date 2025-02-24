<template>
  <div class="w-full h-full relative">
    <div class="absolute z-10 w-full h-full">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <!-- Rectangle -->
        <rect x="0" y="30" width="100" height="140" :fill="wallColors.top" stroke="black" stroke-width="6" />
      </svg>
    </div>
    <div class="absolute z-20 w-full h-full">
      <DashedLinesAndArrow />
    </div>
  </div>
</template>

<script lang="ts" setup>
import DashedLinesAndArrow from './DashedLinesAndArrow.vue';
import { wallColors } from '@/utils/wallColors'


</script>

<style scoped>

</style>


