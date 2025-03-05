<template>
      <div v-if="true" class="relative flex flex-col items-center" :style="{width: 'fit-content', height: 'fit-content'}">
        <div>
          <MySVG
              class="border-2 border-black"
              :matrix="matrix"
              :polygonPoints="polygons.topAndBottom"
              :showCircles="true"
              :width="dimensions.width"
              :height="dimensions.depth"
              :color="wallColors.bottom"
              :colorRightRect="wallColors.right"
              :colorLeftRect="wallColors.left"
              :colorTopRect="wallColors.front"
              :colorBottomRect="wallColors.back"
              :viusaSizeModifier="scale.value"
              :materialThickness="materialThickness"
            />
        </div>
        <div v-if="true" class="relative flex flex-row items-center">
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
              :viusaSizeModifier="scale.value"
              :materialThickness="materialThickness" />
          </div>
          <!-- CENTER -->
          <div class="">
            <!-- CENTER TOP -->
            <MySVG
              class="border-2 border-black border-y-0"
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
              :viusaSizeModifier="scale.value"
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
              :viusaSizeModifier="scale.value"
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
              :viusaSizeModifier="scale.value"
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
              :viusaSizeModifier="scale.value"
              :materialThickness="materialThickness"
            />
          </div>
          <ScaleButton @update:scale="updateScale" v-if="false" />
          <Grid :gridFactor="80" class="absolute" v-if="false" />
        </div>

      </div>
</template>

<script lang="ts" setup>
import { wallColors } from '@/utils/wallColors';
import ScaleButton from './buttonSets/ScaleButton.vue';

const props = defineProps<{
  matrix: MatrixOfHoles,
  polygons: Polygons,
  dimensions: Dimensions,
  materialThickness: number,
  visualSizeModifier: number,
}>()

watch(() => props.visualSizeModifier, (value) => {
  scale.value = value;
})

const scale = reactive({
  value: props.visualSizeModifier || 1
})

const updateScale = (value) => {
  console.log('updateScale');
  scale.value = value;
}

</script>

<style>

</style>