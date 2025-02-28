<template>
      <div v-if="true" class="columns-3 flex justify-center flex-nowrap">
        <div class="flex justify-end items-center" >
          <!-- LEFT -->
          <MySVG
            class="border-2 border-black border-r-0"
            :matrix="matrix"
            :polygonPoints="polygons.leftAndRight"
            :showCircles="false"
            :width="dimensions.height"
            :height="dimensions.depth"
            :color="wallColors.left"
            :colorRightRect="wallColors.top"
            :colorTopRect="wallColors.back"
            :colorBottomRect="wallColors.front"
            :colorLeftRect="wallColors.bottom"
            :viusaSizeModifier="visualSizeModifier"
            :materialThickness="materialThickness" />
        </div>
        <!-- CENTER -->
        <div class="">
          <!-- CENTER TOP -->
          <MySVG
            class="border-2 border-black border-b-0"
            :matrix="matrix"
            :polygonPoints="polygons.frontAndBack"
            :showCircles="false"
            :width="dimensions.width"
            :height="dimensions.height"
            :color="wallColors.back"
            :colorTopRect="wallColors.bottom"
            :colorLeftRect="wallColors.left"
            :colorRightRect="wallColors.right"
            :colorBottomRect="wallColors.top"
            :viusaSizeModifier="visualSizeModifier"
            :materialThickness="materialThickness"
          />
          <!-- CENTER CENTER (MIDDLE) -->
          <MySVG
            class="border-2 border-black"
            :matrix="matrix"
            :polygonPoints="polygons.topAndBottom"
            :showCircles="true"
            :width="dimensions.width"
            :height="dimensions.depth"
            :color="wallColors.top"
            :colorRightRect="wallColors.right"
            :colorLeftRect="wallColors.left"
            :colorTopRect="wallColors.back"
            :colorBottomRect="wallColors.front"
            :viusaSizeModifier="visualSizeModifier"
            :materialThickness="materialThickness"
          />
          <!-- CENTER BOTTOM-->
          <MySVG
            class="border-2 border-black border-t-0"
            :matrix="matrix"
            :polygonPoints="polygons.frontAndBack"
            :showCircles="false"
            :width="dimensions.width"
            :height="dimensions.height"
            :color="wallColors.front"
            :colorTopRect="wallColors.top"
            :colorLeftRect="wallColors.left"
            :colorRightRect="wallColors.right"
            :colorBottomRect="wallColors.bottom"
            :viusaSizeModifier="visualSizeModifier"
            :materialThickness="materialThickness"
          />
        </div>
        <!-- RIGHT -->
        <div class="flex justify-start items-center">
          <MySVG
            class="border-2 border-black border-l-0"
            :matrix="matrix"
            :polygonPoints="polygons.leftAndRight"
            :showCircles="false"
            :width="dimensions.height"
            :height="dimensions.depth"
            :color="wallColors.right"
            :colorRightRect="wallColors.bottom"
            :colorTopRect="wallColors.back"
            :colorLeftRect="wallColors.top"
            :colorBottomRect="wallColors.front"
            :viusaSizeModifier="visualSizeModifier"
            :materialThickness="materialThickness"
          />
        </div>
      </div>
</template>

<script lang="ts" setup>
import { wallColors } from '@/utils/wallColors';

const props = defineProps<{
  matrix: MatrixOfHoles,
  polygons: Polygons,
  dimensions: Dimensions,
  materialThickness: number,
  visualSizeModifier: number,
}>()

</script>

<style>

</style>