<template>
  <div class="w-full bg-slate-400 flex flex-row items-start justify-start">
    
      <TheForm
        @update:visualSizeModifier="updateVisualSizeModifier"
        :matrixTopAndBottom="matrixTopAndBottom"
        :numberOfSteps="numberOfSteps"
        :materialThickness="materialThickness"
        :visualSizeModifier="visualSizeModifier"
        :dimensions="dimensions"
      />

    <div class="p-6 bg-red-200 shadow-md rounded-md max-w-64 items-start ">
      <h2 class="text-2xl font-bold mb-6 text-center">Input Form</h2>

      <div>Width: {{ dimensions.width }} mm</div>
      <div>Depth: {{ dimensions.depth }} mm</div>
      <div>Height: {{ dimensions.height }} mm</div>
      <div>Material Thickness: {{ materialThickness.value }} mm</div>
      <!-- Output Display -->
      <!-- Output Display -->
      <!-- Output Display -->
      <div v-if="submitted" class="mt-6 bg-gray-100 p-4 rounded-md">
        <h3 class="text-xl font-bold mb-4">Form Data</h3>
        <ul>
          <li><strong>Number of Holes:</strong> {{ matrixTopAndBottom.holes }}</li>
          <li><strong>Number of Rows:</strong> {{ matrixTopAndBottom.rows }}</li>
          <li><strong>Spacing Between Holes in X:</strong> {{ matrixTopAndBottom.xSpacing }} mm</li>
          <li><strong>Spacing Between Holes in Y:</strong> {{ matrixTopAndBottom.ySpacing }} mm</li>
          <li><strong>Margin X:</strong> {{ matrixTopAndBottom.xMargin }} mm</li>
          <li><strong>Margin Y:</strong> {{ matrixTopAndBottom.yMargin }} mm</li>
          <li><strong>Hole Diameter:</strong> {{ matrixTopAndBottom.diameter }} mm</li>
          <li><strong>Number of horizontal steps:</strong> {{ numberOfSteps.width}}</li>
          <li><strong>Number of vertical steps:</strong> {{ numberOfSteps.height}}</li>
        </ul>
      </div>
      <Representation_2D
        :matrix="matrixTopAndBottom"
        :dimensions="dimensions"
        :polygons="polygons"
        :visualSizeModifier="visualSizeModifier.value"
        :materialThickness="materialThickness.value"
      />
      <div class="flex justify-center flex-row space-x-4 mt-6">
        <DownloadSVG :svgRef="theSVG" />
        <DownloadDXF :matrix="matrixTopAndBottom" />
        <DownloadG_CODE :matrix="matrixTopAndBottom" />
      </div>
    </div>
      <NewVisualisation3d
        class="mt-8"
        :matrix="matrixTopAndBottom"
        :numberOfSteps="numberOfSteps"
        :materialThickness="materialThickness.value"
        :visualSizeModifier="visualSizeModifier.value"
        :dimensions="dimensions"
        :polygons="polygons"
      />
  </div>

</template>

<script lang="ts" setup>
import type { Dimensions } from '@/utils/types';
import { reactive, ref } from 'vue';
import { MatrixOfHoles } from '@/utils/matrixOfHoles';
import { usePolygons } from '@/utils/composables/usePolygons';

const theSVG = ref<SVGSVGElement | null>(null);

const matrixTopAndBottom = reactive(new MatrixOfHoles(8, 3, 1, 1, 1, 1, 1));

const visualSizeModifier = reactive({
  value: 10
});
 
const dimensions = reactive<Dimensions>({
  width: matrixTopAndBottom.width,
  height: 20,
  depth: matrixTopAndBottom.height,
});

const numberOfSteps = reactive<Dimensions>({
  width: 3,
  height: 2,
  depth: 2
});

const materialThickness = reactive({
  value: 2
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

const submitted = ref(true);

const submitForm = () => {
  submitted.value = true;
};

const polygons = computed(() => {
  return usePolygons(numberOfSteps, stepSizes.value, materialThickness.value);
});

const updateVisualSizeModifier = (value) => {
  visualSizeModifier.value = value;
  console.log('visualSizeModifier.value', visualSizeModifier.value);
};

</script>

<style scoped>

</style>
