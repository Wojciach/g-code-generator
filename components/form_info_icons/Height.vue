<template>
  <div class="relative w-full h-full flex items-center justify-center" :style="{backgroundColor: colors.bg}">
    <div class="absolute z-10">
      <NewVisualisation3d
            class="positionAdjustment"
            :numberOfSteps="numberOfSteps"
            :materialThickness="materialThickness"
            :visualSizeModifier="5"
            :dimensions="dimensions"
            :polygons="polygons"
            :padding="1"
      />
    </div>
    <div class="absolute z-10 w-full h-full positionAdjustment2">
      <DashedLinesAndArrow />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePolygons } from '~/utils/composables/usePolygons';
import DashedLinesAndArrow from './DashedLinesAndArrow.vue';
import { colors } from '@/utils/colors';

const materialThickness = 0;
const dimensions = {width: 5, height: 5, depth: 5}
const numberOfSteps = {width: 2, height: 2, depth: 1};

const stepSizes = computed(()=> {
  return {
    width: (dimensions.width / numberOfSteps.width) /2,
    height: (dimensions.height / numberOfSteps.height) /2,
    depth: (dimensions.depth / numberOfSteps.depth) /2
  }});

const polygons = computed(() => {
  return usePolygons(numberOfSteps, stepSizes.value, materialThickness);
});

</script>

<style scoped>
.positionAdjustment {
  transform: translate(-10px , -3px) scale(1.2);
}
.positionAdjustment2 {
  transform: translate(0 , 4px) scale(1);
}

</style>