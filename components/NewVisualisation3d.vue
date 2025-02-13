<template>
    <div class="bg-purple-900 mt-10" :style="{paddingTop: `${((dimensions.depth + (materialThickness * 2)) * visualSizeModifier)}px`}" >
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
import { polygonGenerator } from '@/utils/polygonGenerator';

const props = defineProps<{
  matrix: MatrixOfHoles;
  numberOfSteps: Dimensions;
  materialThickness: number;
  visualSizeModifier: number;
  dimensions: Dimensions;
}>();

const stepSizes = computed(() => {
    return {
    width: (props.dimensions.width / props.numberOfSteps.width) / 2,
    height: (props.dimensions.height / props.numberOfSteps.height) / 2,
    depth: (props.dimensions.depth / props.numberOfSteps.depth) / 2
  }
});

const polygonPointsTopAndBottom = computed(()=>{
  return polygonGenerator.polygonPointsTopAndBottom(
    {horizontal: props.numberOfSteps.width, vertical: props.numberOfSteps.depth},
    {horizontal: stepSizes.value.width, vertical: stepSizes.value.depth},
    props.materialThickness
  );
});

const polygonPointsFrontAndBack = computed(()=>{
  return polygonGenerator.polygonPointsFrontAndBack(
    {horizontal: props.numberOfSteps.width, vertical: props.numberOfSteps.height},
    {horizontal: stepSizes.value.width, vertical: stepSizes.value.height},
    props.materialThickness
  );
});
const polygonPointsLeftAndRight = computed(()=>{
  return polygonGenerator.polygonPointsLeftAndRight(
    {horizontal: props.numberOfSteps.height, vertical: props.numberOfSteps.depth},
    {horizontal: stepSizes.value.height, vertical: stepSizes.value.depth},
    props.materialThickness
  );
}) 

//TOP SIDE WALL DIV
const computedStyleTop = computed(() => {
  const outsideWidth = (props.dimensions.width + (props.materialThickness * 2)) * props.visualSizeModifier;
  const outsideDepth = (props.dimensions.depth + (props.materialThickness * 2)) * props.visualSizeModifier;
  const translateValueX = outsideDepth / 4;
  const translateValueY = outsideDepth  - (outsideDepth / 4) ;
  return {
    transform: `translateY(-${translateValueY}px) translateX(${translateValueX}px) skewX(-45deg) scaleY(0.5)`,
    top: ``,
  };
});

//FRONT SIDE WALL DIV
const computedStyleFront = computed(() => {
  const translateValue = (1);
  return {
    transform: `scaleY(1)`,
    transformOrigin: 'top center',
    top: ``,
  };
});

//RIGHT SIDE WALL DIV
const computedStyleRight = computed(() => {
  const outsideWidth = (props.dimensions.width + (props.materialThickness * 2)) * props.visualSizeModifier;
  const outsideDepth = (props.dimensions.depth + (props.materialThickness * 2)) * props.visualSizeModifier;
  const outsideHeight = (props.dimensions.height + (props.materialThickness * 2)) * props.visualSizeModifier;
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