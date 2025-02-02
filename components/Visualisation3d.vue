<template>
    <div class="bg-purple-900 mt-10" :style="{paddingTop: `${((dimensions.depth + (materialThickness.value * 2)) * visualSizeModifier.value)}px`}" >
            <!-- SVG VISUAL REPRESENTATION TEST  -->
      <!-- SVG VISUAL REPRESENTATION TEST  -->
      <!-- SVG VISUAL REPRESENTATION TEST  -->
      <div v-if="submitted" class="relative ">
        <!-- TOP -->
        <MySVG
          class="absolute"
          :style="computedStyleTop"
          :matrix="matrixTopAndBottom"
          :steps="stepsTopAndBottom"
          :polygonPoints="polygonPointsTopAndBottom"
          :showCircles="true" :width="dimensions.width"
          :height="dimensions.depth"
          color="gray"
          colorTopRect="purple"
          colorBottomRect="green"
          colorRightRect="tomato"
          colorLeftRect="blue"
          bgColor="#aaaaff"
          :viusaSizeModifier="visualSizeModifier.value"
          :materialThickness="materialThickness.value"
        />
        <!-- FRONT -->
        <MySVG
          class="absolute"
          :style="computedStyleFront"
          :matrix="matrixFrontAndBack"
          :steps="stepsLeftAndRight"
          :polygonPoints="polygonPointsFrontAndBack"
          :showCircles="false"
          :width="dimensions.width"
          :height="dimensions.height"
          color="forestgreen"
          colorTopRect="gray"
          colorBottomRect="orange"
          colorRightRect="tomato"
          colorLeftRect="blue"
          bgColor="#aaaaff"
          :viusaSizeModifier="visualSizeModifier.value"
          :materialThickness="materialThickness.value"
        />
        <!-- RIGHT -->
        <!-- this side is rotated -90deg so top, bottom, left and right rectangle positions do not match visual represetion (clor...Rect prop)  -->
        <!-- top is left  -->
        <!-- bottom is right  -->
        <!-- left is bottom  -->
        <!-- right is top  -->
        <MySVG
          class="absolute"
          :style="computedStyleRight"
          :matrix="matrixLeftAndRight"
          :steps="stepsLeftAndRight"
          :polygonPoints="polygonPointsLeftAndRight"
          :showCircles="false" :width="dimensions.height"
          :height="dimensions.depth"
          color="tomato"
          colorTopRect="green" 
          colorBottomRect="purple"
          colorRightRect="gray"
          colorLeftRect="orange"
          bgColor="#aaaaff"
          :viusaSizeModifier="visualSizeModifier.value"
          :materialThickness="materialThickness.value"
        />
      </div>
      <!-- SVG VISUAL REPRESENTATION TEST  -->
      <!-- SVG VISUAL REPRESENTATION TEST  -->
      <!-- SVG VISUAL REPRESENTATION TEST  -->

    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
  matrixFrontAndBack: MatrixOfHoles;
  matrixLeftAndRight: MatrixOfHoles;
  matrixTopAndBottom: MatrixOfHoles;
  stepsTopAndBottom: StepsGenerator;
  stepsLeftAndRight: StepsGenerator;
  dimensions: { width: number; depth: number; height: number };
  visualSizeModifier: { value: number };
  materialThickness: { value: number };
  polygonPointsTopAndBottom: string;
  polygonPointsFrontAndBack: string;
  polygonPointsLeftAndRight: string;
  submitted: boolean;
}>();

const dimensions = props.dimensions;
const materialThickness = props.materialThickness;
const visualSizeModifier = props.visualSizeModifier;

//TOP
const computedStyleTop = computed(() => {
  const outsideWidth = (dimensions.width + (materialThickness.value * 2)) * visualSizeModifier.value;
  const outsideDepth = (dimensions.depth + (materialThickness.value * 2)) * visualSizeModifier.value;
  const translateValueX = outsideDepth / 4;
  const translateValueY = outsideDepth  - (outsideDepth / 4) ;
  return {
    transform: `translateY(-${translateValueY}px) translateX(${translateValueX}px) skewX(-45deg) scaleY(0.5)`,
    top: ``,
  };
});

//FRONT
const computedStyleFront = computed(() => {
  const translateValue = (1);
  return {
    transform: `scaleY(1)`,
    transformOrigin: 'top center',
    top: ``,
  };
});

//RIGHT
const computedStyleRight = computed(() => {
  const outsideWidth = (dimensions.width + (materialThickness.value * 2)) * visualSizeModifier.value;
  const outsideDepth = (dimensions.depth + (materialThickness.value * 2)) * visualSizeModifier.value;
  const outsideHeight = (dimensions.height + (materialThickness.value * 2)) * visualSizeModifier.value;
  const translateValueX = outsideWidth;
  const translateValueY = outsideHeight; 
  return {
    transform: `translateX(${translateValueX}px) translateY(${translateValueY}px) rotate(-90deg) skewX(45deg) scaleY(0.5)`,
    transformOrigin: 'top left',
    top: ``,
  };
});



</script>

<style>

</style>