<template>
  <div class="w-full h-full relative rotate-90">
    <div class="absolute z-10 w-full h-full">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <!-- Inside of the box -->
        <rect x="0" y="100" width="220" height="140" :fill="wallColors.front" stroke="none" stroke-width="6" />
        <!-- Background -->
        <rect x="0" y="0" width="220" height="100" :fill="colors.bg" stroke="none" stroke-width="6" />
        <!-- Wall of the box to show wall thickness -->
        <rect x="-20" y="30" width="220" height="140" :fill="wallColors.right" stroke="black" stroke-width="6" />
      </svg>
    </div>
    <div class="absolute z-20 w-full h-full">
      <DashedLinesAndArrow :dashedLines="false"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
//import DashedLinesAndArrow from './DashedLinesAndArrow.vue';
import { wallColors } from '@/utils/wallColors'
import { colors } from '@/utils/colors'


</script>

<style scoped>

</style>


