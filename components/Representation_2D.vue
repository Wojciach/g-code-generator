<template>
      <div v-if="true" class="columns-3 flex flex-nowrap bg-purple-300">
        <div class="bg-red-100 flex justify-end items-center" >
          <!-- LEFT -->
          <MySVG
            class=""
            :matrix="matrix"
            :polygonPoints="polygons.leftAndRight"
            :showCircles="false"
            :width="dimensions.height"
            :height="dimensions.depth"
            color="deepskyblue"
            colorRightRect="gray"
            colorTopRect="indigo"
            colorLeftRect="#555"
            :viusaSizeModifier="visualSizeModifier"
            :materialThickness="materialThickness" />
        </div>
        <!-- CENTER -->
        <div class="bg-blue-100">
          <!-- CENTER TOP -->
          <MySVG
            class=""
            :matrix="matrix"
            :polygonPoints="polygons.frontAndBack"
            :showCircles="false"
            :width="dimensions.width"
            :height="dimensions.height"
            color="indigo"
            colorTopRect="#555"
            colorLeftRect="deepskyblue"
            colorRightRect="tomato"
            :viusaSizeModifier="visualSizeModifier"
            :materialThickness="materialThickness"
          />
          <!-- CENTER CENTER (MIDDLE) -->
          <MySVG
            class=""
            :matrix="matrix"
            :polygonPoints="polygons.topAndBottom"
            :showCircles="true"
            :width="dimensions.width"
            :height="dimensions.depth"
            color="gray"
            colorRightRect="tomato"
            colorLeftRect="deepskyblue"
            colorTopRect="indigo"
            :viusaSizeModifier="visualSizeModifier"
            :materialThickness="materialThickness"
          />
          <!-- CENTER BOTTOM-->
          <MySVG
            class=""
            :matrix="matrix"
            :polygonPoints="polygons.frontAndBack"
            :showCircles="false"
            :width="dimensions.width"
            :height="dimensions.height"
            color="forestgreen"
            colorTopRect="gray"
            colorLeftRect="deepskyblue"
            colorRightRect="tomato"
            colorBottomRect="#555"
            :viusaSizeModifier="visualSizeModifier"
            :materialThickness="materialThickness"
          />
        </div>
        <!-- RIGHT -->
        <div class="bg-green-100 flex justify-start items-center">
          <MySVG
            class=""
            :matrix="matrix"
            :polygonPoints="polygons.leftAndRight"
            :showCircles="false"
            :width="dimensions.height"
            :height="dimensions.depth"
            color="tomato"
            colorLeftRect="gray"
            colorRightRect="#555"
            colorTopRect="indigo"
            colorBottomRect="forestgreen"
            :viusaSizeModifier="visualSizeModifier"
            :materialThickness="materialThickness"
          />
        </div>
      </div>
</template>

<script lang="ts" setup>

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