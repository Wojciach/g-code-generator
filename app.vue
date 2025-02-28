<template>
  <div class="w-full flex flex-col items-start justify-start relative bg-transparent z-10">
    <article class="flex flex-row justify-between p-6 bg-gray-200 shadow-md rounded-md w-full">
      <div class="flex flex-row space-x-4 items-center">
        <h2>Current dimensions:</h2>
        <div>Width: {{ dimensions.width }} mm</div>
        <div>Depth: {{ dimensions.depth }} mm</div>
        <div>Height: {{ dimensions.height }} mm</div>
      </div>
      <div class="flex flex-row justify-center space-x-4">
        <!-- <DownloadSVG :svgRef="theSVG" />
        <DownloadDXF :matrix="matrixTopAndBottom" />
        <DownloadG_CODE :matrix="matrixTopAndBottom" /> -->
      </div>
    </article>
    <article class="flex flex-row w-full space-x-4 items-start">
      <section class="bg-blue-200 p-4 rounded-md shadow-md w-fit-content">
        <TheForm
          @update:visualSizeModifier="updateVisualSizeModifier"
          :matrixTopAndBottom="matrixTopAndBottom"
          :numberOfSteps="numberOfSteps"
          :materialThickness="materialThickness"
          :visualSizeModifier="visualSizeModifier"
          :dimensions="dimensions"
          class="bg-slate-400 shadow-md"
        />
      </section>
      <section
        :class="{
          'flex flex-col justify-left w-full h-full relative': true,
          'md:flex-row': ((dimensions.width + dimensions.depth + materialThickness.value) * visualSizeModifier.value < 450),
        }"
      >
        <NewVisualisation3d
          class="m-0"
          :matrix="matrixTopAndBottom"
          :numberOfSteps="numberOfSteps"
          :materialThickness="materialThickness.value"
          :visualSizeModifier="visualSizeModifier.value"
          :dimensions="dimensions"
          :polygons="polygons"
          :padding="50"
          showInfo="height"
        />
        <Representation_2D
          class="m-0"
          :matrix="matrixTopAndBottom"
          :dimensions="dimensions"
          :polygons="polygons"
          :visualSizeModifier="visualSizeModifier.value"
          :materialThickness="materialThickness.value"
        />
        <Grid :gridFactor="gridFactor" />
      </section>
    </article>
  </div>
</template>

<script lang="ts" setup>
import type { Dimensions } from '@/utils/types';
import { reactive, ref } from 'vue';
import { MatrixOfHoles } from '@/utils/matrixOfHoles';
import { usePolygons } from '@/utils/composables/usePolygons';

const theSVG = ref<SVGSVGElement | null>(null);
const matrixTopAndBottom = reactive(new MatrixOfHoles(8, 3, 10, 10, 10, 10, 10));
const visualSizeModifier = reactive({
  value: 1
});

const gridFactor = computed(() => {
  return visualSizeModifier.value  * 10;
});
 
const dimensions = reactive<Dimensions>({
  width: matrixTopAndBottom.width,
  height: 200,
  depth: matrixTopAndBottom.height,
});

const numberOfSteps = reactive<Dimensions>({
  width: 3,
  height: 2,
  depth: 2
});

const materialThickness = reactive({
  value: 20
});

const stepSizes = computed(() => {
  return {
    width: (dimensions.width / numberOfSteps.width) /2,
    height: (dimensions.height / numberOfSteps.height) /2,
    depth: (dimensions.depth / numberOfSteps.depth) /2
  };
});

//Watch for changes in holes, holeSpacing, and holeDiameter to recalculate width
watch([() => matrixTopAndBottom.holes, () => matrixTopAndBottom.rows, () => matrixTopAndBottom.diameter, () => matrixTopAndBottom.xSpacing, () => matrixTopAndBottom.ySpacing, () => matrixTopAndBottom.xMargin, () => matrixTopAndBottom.yMargin], ([newHoles, newRows, newDiameter, newXspacing, newYspacing, newXmargin, newYmargin]) => {
  matrixTopAndBottom.reCalculate(newHoles, newRows, newDiameter, newXspacing, newYspacing, newXmargin, newYmargin);
  dimensions.width = matrixTopAndBottom.width;
  dimensions.depth = matrixTopAndBottom.height;
}, { deep: true });

const polygons = computed(() => {
  return usePolygons(numberOfSteps, stepSizes.value, materialThickness.value);
});

const updateVisualSizeModifier = (value) => {
  visualSizeModifier.value = value;
};

</script>

<style scoped>

</style>
