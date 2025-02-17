<template>
  <div>
    <NewVisualisation3d
          class="bg-red-300"
          :numberOfSteps="numberOfSteps"
          :materialThickness="materialThickness"
          :visualSizeModifier="5"
          :dimensions="dimensions"
          :polygons="polygons"
          :padding="1"
    />
  </div>
</template>

<script lang="ts" setup>
import { usePolygons } from '~/utils/composables/usePolygons';

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

<style>

</style>