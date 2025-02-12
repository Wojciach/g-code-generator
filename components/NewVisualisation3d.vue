<template>
    <div class="bg-purple-900 mt-10" :style="{paddingTop: `${((dimensions.depth + (materialThickness.value * 2)) * visualSizeModifier)}px`}" >
      <!-- VISIUAL REPRESENTATION OF THE BOX -->
      <div class="relative ">
        <!-- TOP -->
        <MySVG
          class="absolute"
          :style="computedStyleTop"
          :matrix="matrix"
          :polygonPoints="polygonPointsTopAndBottom"
          :showCircles="true"
          :width="dimensions.width"
          :height="dimensions.depth"
          color="gray"
          colorTopRect="purple"
          colorBottomRect="green"
          colorRightRect="tomato"
          colorLeftRect="blue"
          bgColor="#aaaaff"
          :viusaSizeModifier="visualSizeModifier"
          :materialThickness="materialThickness"
        />
        <!-- FRONT -->
        <MySVG
          class="absolute"
          :style="computedStyleFront"
          :matrix="matrix"
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
          :viusaSizeModifier="visualSizeModifier"
          :materialThickness="materialThickness"
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
          :matrix="matrix"
          :polygonPoints="polygonPointsLeftAndRight"
          :showCircles="false"
          :width="dimensions.height"
          :height="dimensions.depth"
          color="tomato"
          colorTopRect="green" 
          colorBottomRect="purple"
          colorRightRect="gray"
          colorLeftRect="orange"
          bgColor="#aaaaff"
          :viusaSizeModifier="visualSizeModifier"
          :materialThickness="materialThickness"
        />
      </div>
    </div>
</template>

<script lang="ts" setup>
import type { Dimensions } from '@/utils/types';


const props = defineProps<{
  matrix: MatrixOfHoles;
  numberOfSteps: Dimensions;
  materialThickness: number;
  visualSizeModifier: number;
  dimensions: Dimensions;
}>();

const dimensions = props.dimensions;
const materialThickness = props.materialThickness;
//const visualSizeModifier = props.visualSizeModifier;

//TOP
const computedStyleTop = computed(() => {
  const outsideWidth = (dimensions.width + (materialThickness * 2)) * props.visualSizeModifier;
  const outsideDepth = (dimensions.depth + (materialThickness * 2)) * props.visualSizeModifier;
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
  const outsideWidth = (dimensions.width + (materialThickness * 2)) * props.visualSizeModifier;
  const outsideDepth = (dimensions.depth + (materialThickness * 2)) * props.visualSizeModifier;
  const outsideHeight = (dimensions.height + (materialThickness * 2)) * props.visualSizeModifier;
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