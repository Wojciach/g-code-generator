<template>
    <div
      class="relative flex justify-center items-center"
      :style="{
        width: `fit-content`,
        height: `fit-content`,
        paddingTop: `${(((dimensions.depth + (materialThickness * 2) + modifierForLidCase) * scale.value) / 2) + padding}px`,
        paddingBottom: `${((dimensions.height + (materialThickness * 2)) * scale.value) + padding}px`,
        paddingRight: `${(((dimensions.depth + (dimensions.width * 2) + (materialThickness * 6)) * scale.value)/2) + padding}px`,
        paddingLeft: `${padding}px`,
        margin: 'auto'
      }"
      >
      <!-- VISIUAL REPRESENTATION OF THE BOX -->
      <div class="relative w-full h-full bg-red-400">
        <!-- TOP -->
        <MySVG
          :view3D = "true"
          customID="top_wall_svg"
          class="absolute border-black border-1 border-b-0"
          :style="computedStyleTop"
          :matrix="matrix"
          :polygonPoints="polygons.top ?? ''"
          :showCircles="boxTypeValue === 'openTop' ? false : true"
          :width="dimensions.width"
          :height="dimensions.depth"
          :color="(boxTypeValue === 'openTop') ? undefined : wallColors.top"
          :colorTopRect="wallColors.back"
          :colorBottomRect="wallColors.front"
          :colorRightRect="wallColors.right"
          :colorLeftRect="wallColors.left"
          bgColor="#aaaaff"
          :viusaSizeModifier="scale.value"
          :materialThickness="materialThickness"
        />

        <!-- FRONT -->
        <MySVG
          :view3D = "true"
          customID="front_wall_svg"
          class="absolute"
          :style="computedStyleFront"
          :matrix="matrix"
          :polygonPoints="polygons.front ?? ''"
          :showCircles="false"
          :width="dimensions.width"
          :height="dimensions.height"
          :color="wallColors.front"
          :colorTopRect="wallColors.top"
          :colorBottomRect="wallColors.bottom"
          :colorRightRect="wallColors.right"
          :colorLeftRect="wallColors.left"
          bgColor="#aaaaff"
          :viusaSizeModifier="scale.value"
          :materialThickness="materialThickness"
        />
        <!-- Mock wall depth for the FRONT wall (RIGHT WALL FROM VIEWER POINT OF VIEW) -->
        <div v-if="(boxTypeValue === 'lid')" :style="computedStyleFront_MockWallDepth" class="absolute z-50">
          <div :style="inside" class="absolute z-50"></div>
        </div>
        <!-- Mock wall depth for the FRONT wall (LEFT WALL FROM VIEWER POINT OF VIEW) -->
        <div v-if="(boxTypeValue === 'lid')" :style="computedStyleFront_MockWallDepth_LEFT" class="absolute z-50">
          <div :style="inside_LEFT" class="absolute z-50"></div>
        </div>
        <!-- Mock wall depth for the FRONT wall (FRONT OF THE LID -->
        <div v-if="(boxTypeValue === 'lid')" :style="computedStyleFront_FRONT_OF_THE_LID" class="absolute z-50">
          <div :style="inside_FRONT_OF_THE_LID" class="absolute z-50"></div>
        </div>

        <!-- RIGHT -->
        <!-- this side is rotated -90deg so top, bottom, left and right rectangle positions do not match visual represetion (clor...Rect prop)  -->
        <MySVG
          :view3D = "true"
          customID="right_wall_svg"
          class="absolute"
          :style="computedStyleRight"
          :matrix="matrix"
          :polygonPoints="polygons.right ?? ''"
          :showCircles="false"
          :hingeHoles="boxTypeValue === 'lid' ? true : false"
          :width="dimensions.height"
          :height="dimensions.depth"
          :color="wallColors.right"
          :colorTopRect="wallColors.back"
          :colorBottomRect="wallColors.front"
          :colorRightRect="wallColors.bottom"
          :colorLeftRect="wallColors.top"
          bgColor="#aaaaff"
          :viusaSizeModifier="scale.value"
          :materialThickness="materialThickness"
        />
        <!-- Hook Mock Depth -->
        <div v-if="boxType.value === 'lid'" :style="computedStyleRight_Hook" class="absolute"> </div>

        <!-- LEFT -->
        <!-- this side is rotated -90deg so top, bottom, left and right rectangle positions do not match visual represetion (clor...Rect prop)  -->
        <MySVG
          v-if="(boxTypeValue === 'lid')"
          :view3D = "true"
          customID="left_wall_svg"
          class="absolute"
          :style="computedStyleLeft"
          :matrix="matrix"
          :polygonPoints="polygons.left ?? ''"
          :showCircles="false"
          :hingeHoles="boxTypeValue === 'lid' ? true : false"
          :width="dimensions.height"
          :height="dimensions.depth"
          :color="wallColors.left"
          :colorTopRect="wallColors.back"
          :colorBottomRect="wallColors.front"
          :colorRightRect="wallColors.bottom"
          :colorLeftRect="wallColors.top"
          bgColor="#aaaaff"
          :viusaSizeModifier="scale.value"
          :materialThickness="materialThickness"
        />
        
      </div>
      <ScaleButton @update:scale="updateScale" v-if="showScaleButton || false" />
      <Grid :gridFactor="80" class="absolute"  v-if="false"/>
    </div>
</template>

<script lang="ts" setup>
import type { Dimensions, Polygons } from '@/utils/types';
import { wallColors } from '@/utils/wallColors.ts'
import ScaleButton from './buttonSets/ScaleButton.vue';
import type { CSSProperties } from 'vue';

const props = defineProps<{
  matrix?: MatrixOfHoles;
  numberOfSteps: Dimensions;
  materialThickness: number;
  visualSizeModifier?: number;
  dimensions: Dimensions;
  polygons: Polygons;
  padding: number;
  showInfo?: string;
  showScaleButton?: boolean;
}>();

console.log('POLYGONS LEFT TYPE', typeof props.polygons.left, props.polygons.left) 
const boxType: any = inject('providedBoxType');
const boxTypeValue = computed(() => boxType.value)

const modifierForLidCase = computed(() => {
  return (boxTypeValue.value === 'lid')? props.materialThickness * 7 : 0;
});

const updateScale = (value) => {
  console.log('updateScale');
  scale.value = value;
}

watch(() => props.visualSizeModifier, (value) => {
  scale.value = value || 1;
})

const scale = reactive({
  value: props.visualSizeModifier || 1
})

const outsideDimensions = computed(() => {
  return {
    width: (props.dimensions.width + (props.materialThickness * 2)) * scale.value,
    depth: (props.dimensions.depth + (props.materialThickness * 2)) * scale.value,
    height: (props.dimensions.height + (props.materialThickness * 2)) * scale.value,
  };
});

//TOP SIDE WALL DIV
const computedStyleTop = computed(() => {
  const translateValueX = outsideDimensions.value.depth / 4;
  const translateValueY = outsideDimensions.value.depth  - (outsideDimensions.value.depth / 4);
  const matThic = (boxTypeValue.value === 'lid')? props.materialThickness * scale.value : 0;
  return {
    transform: `translateY(-${translateValueY + (matThic * 2.5)}px) translateX(${translateValueX + (matThic * 0.5)}px) skewX(-45deg) scaleY(0.5)`,
    clipPath: `inset(0px 0px 0px ${matThic}px)`,
    zIndex: 10,
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
const computedStyleFront_FRONT_OF_THE_LID = computed(() => {
  const matThic = props.materialThickness * scale.value;
  const translateValueX = matThic - (matThic * 0.25);
  const translateValueY = matThic * 0.25 + 0.1;
  return {
    transform: `translateX(${translateValueX}px) translateY(-${translateValueY}px)`,
    transformOrigin: 'top center',
    width: `${props.dimensions.width * scale.value}px`,
    height : `${matThic}px `,
    backgroundColor: wallColors.top,
    border: '0.5px solid black',
    borderTop: '0px',
    zIndex: 10
  };
});

const inside_FRONT_OF_THE_LID = computed(() => {
  const matThic = props.materialThickness * scale.value;
  const translateValueX = outsideDimensions.value.width - (matThic * 2) - 0.75;
  const translateValueY = -0.35;
  return {
    transform: `translateX(${translateValueX}px) translateY(${translateValueY}px) skewY(-45deg) scaleY(0.5)`,
    transformOrigin: 'top left',
    width: `${matThic}px`,
    height : `${1.65 + matThic * 2}px`,
    backgroundColor: wallColors.top,
    border: '0.5px solid black',
  };
});

const computedStyleFront_MockWallDepth_LEFT = computed(() => {
  const matThic = props.materialThickness * scale.value;
  const translateValueX = 0;
  const translateValueY = matThic * 3;
  return {
    transform: `translateX(${translateValueX}px) translateY(-${translateValueY}px)`,
    transformOrigin: 'top center',
    width: `${matThic}px`,
    height : `${matThic * 3}px `,
    backgroundColor: wallColors.left,
    border: '0.4px solid black',
    zIndex: 8
  };
});
const inside_LEFT = computed(() => {
  const matThic = props.materialThickness * scale.value;
  const translateValueX = -0.4;
  const translateValueY = outsideDimensions.value.depth + (matThic * 4) + 0.3;
  return {
    transform: `translateX(${translateValueX}px) translateY(-${translateValueY}px) skewX(-45deg) scaleY(0.5)`,
    transformOrigin: 'bottom center',
    width: `${matThic}px`,
    height : `${outsideDimensions.value.depth + (matThic * 4)}px`,
    backgroundColor: wallColors.left,
    border: '0.5px solid black'
  };
});

const computedStyleFront_MockWallDepth = computed(() => {
  const matThic = props.materialThickness * scale.value;
  const translateValueX = outsideDimensions.value.width - matThic;
  const translateValueY = matThic * 3;
  return {
    transform: `translateX(${translateValueX}px) translateY(-${translateValueY}px)`,
    transformOrigin: 'top center',
    width: `${matThic}px`,
    height : `${matThic * 4}px`,
    backgroundColor: wallColors.right,
    border: '0.5px solid black'
  };
});
const inside = computed(() => {
  const matThic = props.materialThickness * scale.value;
  const translateValueX = -0.5;
  const translateValueY = outsideDimensions.value.depth + (matThic * 4) + 0.3;
  return {
    transform: `translateX(${translateValueX}px) translateY(-${translateValueY}px) skewX(-45deg) scaleY(0.5)`,
    transformOrigin: 'bottom center',
    width: `${matThic}px`,
    height : `${outsideDimensions.value.depth + (matThic * 4)}px`,
    backgroundColor: wallColors.right,
    border: '0.5px solid black'
  };
});

//RIGHT SIDE WALL DIV
const computedStyleRight = computed(() => {
  const translateValueX = outsideDimensions.value.width;
  const translateValueY = outsideDimensions.value.height; 
  return {
    transform: `translateX(${translateValueX}px) translateY(${translateValueY}px) rotate(-90deg) skewX(45deg) scaleY(0.5)`,
    transformOrigin: 'top left',
    zIndex: 20
  };
});

const computedStyleRight_Hook = computed((): CSSProperties => {
  const matThic = props.materialThickness * scale.value;
  const translateValueX = outsideDimensions.value.width +  outsideDimensions.value.depth / 2 + matThic / 5;
  const translateValueY = ((outsideDimensions.value.height + outsideDimensions.value.depth / 2) - outsideDimensions.value.height) - matThic; 
  return {
    transform: `translateX(${translateValueX}px) translateY(-${translateValueY}px) rotate(0deg) skewX(0deg) scaleY(0.5)`,
    transformOrigin: 'top left',
    zIndex: -10,
    backgroundColor: wallColors.rightButDarker,
    position: 'absolute',
    width: `${matThic * 0.8}px`,
    height: `${matThic * 4}px`,
  };
});

//LEFT SIDE WALL DIV
const computedStyleLeft = computed(() => {
  const translateValueX = props.materialThickness * scale.value;
  const translateValueY = outsideDimensions.value.height; 
  return {
    transform: `translateX(${translateValueX}px) translateY(${translateValueY}px) rotate(-90deg) skewX(45deg) scaleY(0.5)`,
    transformOrigin: 'top left',
    zIndex: -10
  };
});

</script>

<style scoped>
.border-1 {
  border-width: 1px;
}

</style>