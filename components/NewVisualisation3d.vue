<template>
    <div
      class="relative flex justify-left items-center"
      :style="{
        // width: `${((dimensions.width + (materialThickness * 2)) * visualSizeModifier)}px`,
       // height: `${((dimensions.depth + (materialThickness * 2)) * visualSizeModifier)}px`,
        width: 'fit-content',
        height: '100%',
        //padding: '100px',
        paddingTop: `${(((dimensions.depth + (materialThickness * 2)) * visualSizeModifier) / 2) + padding}px`,
        paddingBottom: `${((dimensions.height + (materialThickness * 2)) * visualSizeModifier) + padding}px`,
        paddingRight: `${(((dimensions.depth + (dimensions.width * 2) + (materialThickness * 6)) * visualSizeModifier)/2) + padding}px`,
        paddingLeft: `${padding}px`,
        margin: '0',
        marginTop: '0',
        bottom: '0px'
      }"
      >
      <!-- VISIUAL REPRESENTATION OF THE BOX -->
      <div class="relative">
        <!-- TOP -->
        <MySVG
          class="absolute border-black border-1 border-b-0"
          :style="computedStyleTop"
          :matrix="matrix"
          :polygonPoints="polygons.topAndBottom"
          :showCircles="true"
          :width="dimensions.width"
          :height="dimensions.depth"
          :color="wallColors.top"
          :colorTopRect="wallColors.back"
          :colorBottomRect="wallColors.front"
          :colorRightRect="wallColors.right"
          :colorLeftRect="wallColors.left"
          bgColor="#aaaaff"
          :viusaSizeModifier="visualSizeModifier"
          :materialThickness="materialThickness"
        />
        <!-- FRONT -->
        <MySVG
          class="absolute border-black border-1 border-t-0"
          :style="computedStyleFront"
          :matrix="matrix"
          :polygonPoints="polygons.frontAndBack"
          :showCircles="false"
          :width="dimensions.width"
          :height="dimensions.height"
          :color="wallColors.front"
          :colorTopRect="wallColors.top"
          :colorBottomRect="wallColors.bottom"
          :colorRightRect="wallColors.right"
          :colorLeftRect="wallColors.left"
          bgColor="#aaaaff"
          :viusaSizeModifier="visualSizeModifier"
          :materialThickness="materialThickness"
        />
        <div class="absolute z-20">
          <!-- <HeightFocusInfo
            v-if="showInfo && showInfo.includes('height')"
            :width="dimensions.width"
            :height="dimensions.height"
            :viusaSizeModifier="visualSizeModifier"
            :materialThickness="materialThickness"
          /> -->
        </div>
        <!-- RIGHT -->
        <!-- this side is rotated -90deg so top, bottom, left and right rectangle positions do not match visual represetion (clor...Rect prop)  -->
        <!-- top is left  -->
        <!-- bottom is right  -->
        <!-- left is bottom  -->
        <!-- right is top  -->
        <MySVG
          class="absolute border-black border-2 border-b-4"
          :style="computedStyleRight"
          :matrix="matrix"
          :polygonPoints="polygons.leftAndRight"
          :showCircles="false"
          :width="dimensions.height"
          :height="dimensions.depth"
          :color="wallColors.right"
          :colorTopRect="wallColors.front"
          :colorBottomRect="wallColors.back"
          :colorRightRect="wallColors.top"
          :colorLeftRect="wallColors.bottom"
          bgColor="#aaaaff"
          :viusaSizeModifier="visualSizeModifier"
          :materialThickness="materialThickness"
        />
      </div>
    </div>
</template>

<script lang="ts" setup>
import type { Dimensions, Polygons } from '@/utils/types';
import HeightFocusInfo from './on_focus_info/HeightFocusInfo.vue';
import { wallColors } from '@/utils/wallColors.ts'

const props = defineProps<{
  matrix?: MatrixOfHoles;
  numberOfSteps: Dimensions;
  materialThickness: number;
  visualSizeModifier: number;
  dimensions: Dimensions;
  polygons: Polygons;
  padding: number;
  showInfo?: string;
}>();

const outsideDimensions = computed(() => {
  return {
    width: (props.dimensions.width + (props.materialThickness * 2)) * props.visualSizeModifier,
    depth: (props.dimensions.depth + (props.materialThickness * 2)) * props.visualSizeModifier,
    height: (props.dimensions.height + (props.materialThickness * 2)) * props.visualSizeModifier,
  };
});

//TOP SIDE WALL DIV
const computedStyleTop = computed(() => {
  // const outsideWidth = (props.dimensions.width + (props.materialThickness * 2)) * props.visualSizeModifier;
  // const outsideDepth = (props.dimensions.depth + (props.materialThickness * 2)) * props.visualSizeModifier;
  const translateValueX = outsideDimensions.value.depth / 4;
  const translateValueY = outsideDimensions.value.depth  - (outsideDimensions.value.depth / 4) ;
  return {
    transform: `translateY(-${translateValueY}px) translateX(${translateValueX}px) skewX(-45deg) scaleY(0.5)`,
  };
});

//FRONT SIDE WALL DIV
const computedStyleFront = computed(() => {
  const translateValue = (1);
  return {
    transform: `scaleY(1)`,
    transformOrigin: 'top center',
    zIndex: 10
  };
});

//RIGHT SIDE WALL DIV
const computedStyleRight = computed(() => {
  const translateValueX = outsideDimensions.value.width;
  const translateValueY = outsideDimensions.value.height; 
  return {
    transform: `translateX(${translateValueX}px) translateY(${translateValueY}px) rotate(-90deg) skewX(45deg) scaleY(0.5)`,
    transformOrigin: 'top left',
    zIndex: 0
  };
});

</script>

<style scoped>
.border-1 {
  border-width: 1px;
}

</style>