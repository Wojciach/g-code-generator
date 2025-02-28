<template>
  <div class="w-full relative">
    <StepsNumberWidth class="x z-10 absolute" :skewText="false" :rotateLettersBy="(0)" :propColor="{steps: wallColors.right, topWall: wallColors.top}" />
    <div class="bg-yellow-400 relative z-0 w-10 h-10 flex top-0 left-0">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="200" height="200" :fill="wallColors.top" stroke="none" stroke-width="0" />
        <rect x="100" y="100" width="100" height="100" :fill="wallColors.right" stroke="none" stroke-width="0" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import StepsNumberWidth from './StepsNumberWidth.vue';
import { colors } from '@/utils/colors';
import { wallColors } from '@/utils/wallColors'
 
</script>

<style>
.x {
  /* transform: skew(0deg, -35deg) scaleY(0.4); */
  transform: rotate(-45deg);
}

/* .x text {
  transform: skew(0deg, 35deg) scaleY(2.5);
} */

</style>