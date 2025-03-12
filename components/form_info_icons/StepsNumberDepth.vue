<template>
  <div class="w-full relative">
    <StepsNumberWidth class="x z-10 absolute" :skewText="false" :rotateLettersBy="(0)" :propColor="{steps: wallColors.right, topWall: wallColors.top}" />
    <div class="relative z-0 w-10 h-10 flex top-0 left-0" :style="{backgroundColor: colors.mainBg}">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="88" y="-50" width="100" height="300" :fill="wallColors.top" stroke="black" stroke-width="4" transform="rotate(45, 100, 100)" />
        <!--right bottom corner (that one that missing from StepNumberWidth casued by rotation)-->
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