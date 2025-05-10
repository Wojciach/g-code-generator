<template>
    <div
      class="relative flex justify-center items-center"
      :style="{
        // width: `${((dimensions.width + (materialThickness * 2)) * scale.value)}px`,
        // height: `${((dimensions.depth + (materialThickness * 2)) * scale.value)}px`,
        width: `fit-content`,
        height: `fit-content`,
        //padding: '100px',
        //paddingTop: `${(((dimensions.depth + (materialThickness * 2)) * scale.value) / 2) + padding}px`,
        paddingTop: `${(((dimensions.depth + (materialThickness * 2)) * scale.value) / 2) + padding}px`,
        paddingBottom: `${((dimensions.height + (materialThickness * 2)) * scale.value) + padding}px`,
        paddingRight: `${(((dimensions.depth + (dimensions.width * 2) + (materialThickness * 6)) * scale.value)/2) + padding}px`,
        paddingLeft: `${padding}px`,
        //margin: '100px',
        //bottom: '0px'
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
          :polygonPoints="polygons.top"
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
          :polygonPoints="polygons.front"
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


        <!-- RIGHT -->
        <!-- this side is rotated -90deg so top, bottom, left and right rectangle positions do not match visual represetion (clor...Rect prop)  -->
        <MySVG
          :view3D = "true"
          customID="right_wall_svg"
          class="absolute"
          :style="computedStyleRight"
          :matrix="matrix"
          :polygonPoints="polygons.right"
          :showCircles="false"
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

        <!-- LEFT -->
        <!-- this side is rotated -90deg so top, bottom, left and right rectangle positions do not match visual represetion (clor...Rect prop)  -->
        <MySVG
          v-if="(boxTypeValue === 'lid')"
          :view3D = "true"
          customID="left_wall_svg"
          class="absolute"
          :style="computedStyleLeft"
          :matrix="matrix"
          :polygonPoints="polygons.left"
          :showCircles="false"
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
    transform: `translateY(-${translateValueY + (matThic * 2.6)}px) translateX(${translateValueX + (matThic * 0.7)}px) skewX(-45deg) scaleY(0.5)`,
    clipPath: `inset(0px 0px 0px ${matThic}px)`
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
const computedStyleFront_MockWallDepth_LEFT = computed(() => {
  const matThic = props.materialThickness * scale.value;
  const translateValueX = 0;
  const translateValueY = matThic * 2;
  return {
    transform: `translateX(${translateValueX}px) translateY(-${translateValueY}px)`,
    transformOrigin: 'top center',
    width: `${matThic}px`,
    height : `${matThic * 2}px `,
    backgroundColor: wallColors.left
  };
});
const inside_LEFT = computed(() => {
  const matThic = props.materialThickness * scale.value;
  const translateValueX = 0;
  const translateValueY = outsideDimensions.value.depth + (matThic * 3);
  return {
    transform: `translateX(${translateValueX}px) translateY(-${translateValueY}px) skewX(-45deg) scaleY(0.5)`,
    transformOrigin: 'bottom center',
    width: `${matThic}px`,
    height : `${outsideDimensions.value.depth + (matThic * 3)}px`,
    backgroundColor: wallColors.left,
    border: '1px solid black'
  };
});

const computedStyleFront_MockWallDepth = computed(() => {
  const matThic = props.materialThickness * scale.value;
  const translateValueX = outsideDimensions.value.width - matThic;
  const translateValueY = matThic * 2;
  return {
    transform: `translateX(${translateValueX}px) translateY(-${translateValueY}px)`,
    transformOrigin: 'top center',
    width: `${matThic}px`,
    height : `${matThic * 3}px`,
    backgroundColor: wallColors.right,
  };
});
const inside = computed(() => {
  const matThic = props.materialThickness * scale.value;
  const translateValueX = 0;
  const translateValueY = outsideDimensions.value.depth + (matThic * 3);
  return {
    transform: `translateX(${translateValueX}px) translateY(-${translateValueY}px) skewX(-45deg) scaleY(0.5)`,
    transformOrigin: 'bottom center',
    width: `${matThic}px`,
    height : `${outsideDimensions.value.depth + (matThic * 3)}px`,
    backgroundColor: wallColors.right,
    border: '1px solid black'
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