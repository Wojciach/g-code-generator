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
          <li><strong>Number of horizontal steps:</strong> {{ stepsTopAndBottom.numberOfStepsHorizontal}}</li>
          <li><strong>Number of vertical steps:</strong> {{ stepsTopAndBottom.numberOfStepsVertical}}</li>
        </ul>
      </div>
      <div v-if="submitted" class="columns-3 flex flex-nowrap bg-purple-300">
        <div class="bg-red-100 flex justify-end items-center" >
          <!-- LEFT -->
          <MySVG
            class=""
            :matrix="matrixLeftAndRight"
            :steps="stepsLeftAndRight"
            :polygonPoints="polygonPointsLeftAndRight"
            :showCircles="false"
            :width="dimensions.height"
            :height="dimensions.depth"
            color="deepskyblue"
            colorRightRect="gray"
            colorTopRect="indigo"
            colorLeftRect="#555"
            :viusaSizeModifier="visualSizeModifier.value"
            :materialThickness="materialThickness.value" />
        </div>
        <!-- CENTER -->
        <div class="bg-blue-100">
          <!-- CENTER TOP -->
          <MySVG
            class=""
            :matrix="matrixFrontAndBack"
            :steps="stepsLeftAndRight"
            :polygonPoints="polygonPointsFrontAndBack"
            :showCircles="false"
            :width="dimensions.width"
            :height="dimensions.height"
            color="indigo"
            colorTopRect="#555"
            colorLeftRect="deepskyblue"
            colorRightRect="tomato"
            :viusaSizeModifier="visualSizeModifier.value"
            :materialThickness="materialThickness.value"
          />
          <!-- CENTER CENTER (MIDDLE) -->
          <MySVG
            class=""
            :matrix="matrixTopAndBottom"
            :steps="stepsTopAndBottom"
            :polygonPoints="polygonPointsTopAndBottom"
            :showCircles="true"
            :width="dimensions.width"
            :height="dimensions.depth"
            color="gray"
            colorRightRect="tomato"
            colorLeftRect="deepskyblue"
            colorTopRect="indigo"
            :viusaSizeModifier="visualSizeModifier.value"
            :materialThickness="materialThickness.value"
          />
          <!-- CENTER BOTTOM-->
          <MySVG
            class=""
            :matrix="matrixFrontAndBack"
            :steps="stepsLeftAndRight"
            :polygonPoints="polygonPointsFrontAndBack"
            :showCircles="false"
            :width="dimensions.width"
            :height="dimensions.height"
            color="forestgreen"
            colorTopRect="gray"
            colorLeftRect="deepskyblue"
            colorRightRect="tomato"
            colorBottomRect="#555"
            :viusaSizeModifier="visualSizeModifier.value"
            :materialThickness="materialThickness.value"
          />
        </div>
        <!-- RIGHT -->
        <div class="bg-green-100 flex justify-start items-center">
          <MySVG
            class=""
            :matrix="matrixLeftAndRight"
            :steps="stepsLeftAndRight"
            :polygonPoints="polygonPointsLeftAndRight"
            :showCircles="false"
            :width="dimensions.height"
            :height="dimensions.depth"
            color="tomato"
            colorLeftRect="gray"
            colorRightRect="#555"
            colorTopRect="indigo"
            colorBottomRect="forestgreen"
            :viusaSizeModifier="visualSizeModifier.value"
            :materialThickness="materialThickness.value"
          />
        </div>
      </div>
      <div class="flex justify-center flex-row space-x-4 mt-6">
        <DownloadSVG :svgRef="theSVG" />
        <DownloadDXF :matrix="matrixTopAndBottom" />
        <DownloadG_CODE :matrix="matrixTopAndBottom" />
      </div>
    </div>
      <Visualisation3d
        :matrixFrontAndBack="matrixFrontAndBack"
        :matrixLeftAndRight="matrixLeftAndRight"
        :matrixTopAndBottom="matrixTopAndBottom"
        :stepsTopAndBottom="stepsTopAndBottom"
        :stepsLeftAndRight="stepsLeftAndRight"
        :visualSizeModifier="visualSizeModifier.value"
        :materialThickness="materialThickness"
        :polygonPointsTopAndBottom="polygonPointsTopAndBottom"
        :polygonPointsFrontAndBack="polygonPointsFrontAndBack"
        :polygonPointsLeftAndRight="polygonPointsLeftAndRight"
        :dimensions="dimensions"
        :submitted="submitted"
      />
  </div>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { MatrixOfHoles } from '@/utils/matrixOfHoles';
import { StepsGenerator } from '@/utils/stepsGenerator';
import { updateTemplates } from 'nuxt/kit';
//import Visualisation3d from './components/Visualisation3d.vue';

const theSVG = ref<SVGSVGElement | null>(null);

const matrixTopAndBottom = reactive(new MatrixOfHoles(8, 3, 1, 1, 1, 1, 1));
const matrixFrontAndBack = reactive(new MatrixOfHoles(3, 3, 1, 1, 1, 1, 1));
const matrixLeftAndRight = reactive(new MatrixOfHoles(3, 3, 1, 1, 1, 1, 1));

const stepsTopAndBottom = reactive(new StepsGenerator(7, 7, 2, 2, 2));
const stepsFrontAndBack = reactive(new StepsGenerator(7, 7, 2, 2, 2));
const stepsLeftAndRight = reactive(new StepsGenerator(7, 4, 2, 2, 2));

const visualSizeModifier = reactive({
  value: 10
});
 
const dimensions = reactive({
  width: matrixTopAndBottom.width,
  height: 20,
  depth: matrixTopAndBottom.height,
});

const numberOfSteps = reactive({
  width: 3,
  height: 2,
  depth: 2
});

const materialThickness = reactive({
  value: 2
});

const stepSize = computed(() => {
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

const polygonPointsTopAndBottom = computed(() => {
  let points = '';
  const numberOfStepsHorizontal = numberOfSteps.width;
  const numberOfStepsVerticlal = numberOfSteps.depth;
  stepsTopAndBottom.currentPosition = { x: materialThickness.value, y: materialThickness.value };

  points += `${stepsTopAndBottom.currentPosition.x},${stepsTopAndBottom.currentPosition.y} `;
  
  for(let i = 0; i < numberOfStepsHorizontal; i++) {
    points += `${stepsTopAndBottom.goRightXplusYzero(stepsTopAndBottom.currentPosition, stepSize.value.width, stepSize.value.depth, materialThickness.value)}`;
  }
  for(let i = 0; i < numberOfStepsVerticlal; i++) {
    points += `${stepsTopAndBottom.goDownXzeroYminus(stepsTopAndBottom.currentPosition, stepSize.value.width, stepSize.value.depth, materialThickness.value)}`;
  }
  for(let i = 0; i < numberOfStepsHorizontal; i++) {
    points += `${stepsTopAndBottom.goLeftXminusYzero(stepsTopAndBottom.currentPosition, stepSize.value.width, stepSize.value.depth, materialThickness.value)}`;
  }
  for(let i = 0; i < numberOfStepsVerticlal; i++) {
    points += `${stepsTopAndBottom.goUpXzeroYminus(stepsTopAndBottom.currentPosition, stepSize.value.width, stepSize.value.depth, materialThickness.value)}`;
  }
  return `${points}`;
});

const polygonPointsFrontAndBack = computed(() => {
  let points = '';
  const numberOfStepsHorizontal = numberOfSteps.width;
  const numberOfStepsVerticlal = numberOfSteps.height;
  stepsFrontAndBack.currentPosition = { x: materialThickness.value, y: materialThickness.value };

  points += `${stepsFrontAndBack.currentPosition.x},${stepsFrontAndBack.currentPosition.y} `;
  
  for(let i = 0; i < numberOfStepsHorizontal; i++) {
    points += `${stepsFrontAndBack.goRightXplusYzero(stepsFrontAndBack.currentPosition, stepSize.value.width, stepSize.value.height, materialThickness.value)}`;
  }
  for(let i = 0; i < numberOfStepsVerticlal; i++) {
    points += `${stepsFrontAndBack.goDownXzeroYminus(stepsFrontAndBack.currentPosition, stepSize.value.width, stepSize.value.height, materialThickness.value)}`;
  }
  for(let i = 0; i < numberOfStepsHorizontal; i++) {
    points += `${stepsFrontAndBack.goLeftXminusYzero(stepsFrontAndBack.currentPosition, stepSize.value.width, stepSize.value.height, materialThickness.value)}`;
  }
  for(let i = 0; i < numberOfStepsVerticlal; i++) {
    points += `${stepsFrontAndBack.goUpXzeroYminus(stepsFrontAndBack.currentPosition, stepSize.value.width, stepSize.value.height, materialThickness.value)}`;
  }
  return `${points}`;
});

const polygonPointsLeftAndRight = computed(() => {
  let points = '';
  const numberOfStepsHorizontal = numberOfSteps.height;
  const numberOfStepsVerticlal = numberOfSteps.depth;
  stepsLeftAndRight.currentPosition = { x: materialThickness.value, y: materialThickness.value };

  points += `${stepsLeftAndRight.currentPosition.x},${stepsLeftAndRight.currentPosition.y} `;

  points +=`${stepsLeftAndRight.makeCornerXplusYplus(stepsLeftAndRight.currentPosition, stepSize.value.height, stepSize.value.depth, materialThickness.value)}`;
  for(let i = 0; i < (numberOfStepsHorizontal -1); i++) {
    points += `${stepsLeftAndRight.goRightXplusYzero(stepsLeftAndRight.currentPosition, stepSize.value.height, stepSize.value.depth, materialThickness.value)}`;
  }
  
  points +=`${stepsLeftAndRight.makeCornerXplusYminus(stepsLeftAndRight.currentPosition, stepSize.value.height, stepSize.value.depth, materialThickness.value)}`;
  for(let i = 0; i < (numberOfStepsVerticlal -1); i++) {
    points += `${stepsLeftAndRight.goDownXzeroYminus(stepsLeftAndRight.currentPosition, stepSize.value.height, stepSize.value.depth, materialThickness.value)}`;
  }

  points +=`${stepsLeftAndRight.makeCornerXminusYplus(stepsLeftAndRight.currentPosition, stepSize.value.height, stepSize.value.depth, materialThickness.value)}`;
  for(let i = 0; i < (numberOfStepsHorizontal -1); i++) {
    points += `${stepsLeftAndRight.goLeftXminusYzero(stepsLeftAndRight.currentPosition, stepSize.value.height, stepSize.value.depth, materialThickness.value)}`;
  }

  points +=`${stepsLeftAndRight.makeCornerXminusYminus(stepsLeftAndRight.currentPosition, stepSize.value.height, stepSize.value.depth, materialThickness.value)}`;
  for(let i = 0; i < (numberOfStepsVerticlal -1); i++) {
    points += `${stepsLeftAndRight.goUpXzeroYminus(stepsLeftAndRight.currentPosition, stepSize.value.height, stepSize.value.depth, materialThickness.value)}`;
  }
  return `${points}`;
});

const updateVisualSizeModifier = (value) => {
  visualSizeModifier.value = value;
  console.log('visualSizeModifier.value', visualSizeModifier.value);
};

</script>

<style scoped>

</style>
