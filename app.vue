<template>
  <div class="mx-auto p-6 bg-white shadow-md rounded-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Input Form</h2>

    <form @submit.prevent="submitForm">
      <!-- Number of Holes -->
      <div class="mb-4">
        <label for="holes" class="block text-gray-700">Number of Holes</label>
        <input
          v-model="matrixTopAndBottom.holes"
          id="holes"
          type="number"
          min="1"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="Enter number of holes"
          required
        />
      </div>

      <!-- Number of Rows -->
      <div class="mb-4">
        <label for="holes" class="block text-gray-700">Number of Rows</label>
        <input
          v-model="matrixTopAndBottom.rows"
          id="rows"
          type="number"
          min="1"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="Enter number of rows"
          required
        />
      </div>

      <!-- x Between Holes -->
      <div class="mb-4">
        <label for="holeXspacing" class="block text-gray-700"> X Spacing Between Holes (mm)</label>
        <input
          v-model="matrixTopAndBottom.xSpacing"
          id="holeXspacing"
          type="number"
          min="0"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="Enter spacing between holes in X"
          required
        />
      </div>
      <!-- y Between Holes -->
      <div class="mb-4">
        <label for="holeYspacing" class="block text-gray-700"> Y Spacing Between Holes (mm)</label>
        <input
          v-model="matrixTopAndBottom.ySpacing"
          id="holeYspacing"
          type="number"
          min="0"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="Enter spacing between holes in Y"
          required
        />
      </div>
      <!-- x Margin -->
      <div class="mb-4">
        <label for="xMargin" class="block text-gray-700"> X Margin (mm)</label>
        <input
          v-model="matrixTopAndBottom.xMargin"
          id="xMargin"
          type="number"
          min="0"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="X Margin"
          required
        />
      </div>
      <!-- y Margin -->
      <div class="mb-4">
        <label for="yMargin" class="block text-gray-700"> Y Margin (mm)</label>
        <input
          v-model="matrixTopAndBottom.yMargin"
          id="yMargin"
          type="number"
          min="0"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="Y Margin"
          required
        />
      </div>

      <!-- Hole Diameter -->
      <div class="mb-4">
        <label for="holeDiameter" class="block text-gray-700">Hole Diameter (mm)</label>
        <input
          v-model="matrixTopAndBottom.diameter"
          id="holeDiameter"
          type="number"
          min="1"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="Enter hole diameter"
          required
        />
      </div>

      <!-- Number of horizontal steps -->
      <div class="mb-4">
        <label for="numberOfStepsHorizontal" class="block text-gray-700"> Nmber of horizontal steps (width)</label>
        <input
          v-model="numberOfSteps.width"
          id="numberOfStepsHorizontal"
          type="number"
          :min="1"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="How many horizontal steps?"
          required
          />
      </div>

      <!-- Number of vertical steps -->
      <div class="mb-4">
        <label for="numberOfStepsVertical" class="block text-gray-700"> Nmber of vertical steps (depth)</label>
        <input
          v-model="numberOfSteps.depth"
          id="numberOfStepsVertical"
          type="number"
          :min="1"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="How many vertical steps?"
          required
          />
        </div>

      <!-- Number of vertical steps (in Z axis) -->
      <div class="mb-4">
        <label for="numberOfStepsInZAxis" class="block text-gray-700"> Nmber of vertical steps in Z axis (height)</label>
        <input
          v-model="numberOfSteps.height"
          id="numberOfStepsInZAxis"
          type="number"
          :min="1"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="How many vertical steps in Z axis?"
          required
          />
        </div>

      <!-- Height in Z axis -->
      <div class="mb-4">
        <label for="heightInZAxis" class="block text-gray-700"> Height in Z axis</label>
        <input
          v-model="dimensions.height"
          id="heightInZAxis"
          type="number"
          :min="materialThickness.value * 2"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="Height in Z axis?"
          required
          />
        </div>

              <!-- Height in Z axis -->
      <div class="mb-4">
        <label for="materialThickness" class="block text-gray-700"> Material thickness</label>
        <input
          v-model="materialThickness.value"
          id="materialThickness"
          type="number"
          :min="1"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="Material thickness?"
          required
          />
        </div>
      <!-- Submit Button -->
      <div class="flex justify-center">
        <button type="submit" @click="submission" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Submit
        </button>
      </div>
    </form>
    <div>Width: {{ dimensions.width }} mm</div>
    <div>Depth: {{ dimensions.depth }} mm</div>
    <div>Height: {{ dimensions.height }} mm</div>
    <div>Material Thickness: {{ materialThickness.value }} mm</div>

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
        <MySVG class="" :matrix="matrixLeftAndRight" :steps="stepsLeftAndRight" :polygonPoints="polygonPointsLeftAndRight" :showCircles="false" :width="dimensions.height" :height="dimensions.depth" color="deepskyblue"/>
      </div>
      <!-- SVG Representation -->
      <div class="bg-blue-100">
        <MySVG class="" :matrix="matrixFrontAndBack" :steps="stepsLeftAndRight" :polygonPoints="polygonPointsFrontAndBack" :showCircles="false" :width="dimensions.width" :height="dimensions.height" color="indigo"/>
        <MySVG class="" :matrix="matrixTopAndBottom" :steps="stepsTopAndBottom" :polygonPoints="polygonPointsTopAndBottom" :showCircles="true" :width="dimensions.width" :height="dimensions.depth" color="gray"/>
        <MySVG class="" :matrix="matrixFrontAndBack" :steps="stepsLeftAndRight" :polygonPoints="polygonPointsFrontAndBack" :showCircles="false" :width="dimensions.width" :height="dimensions.height" color="forestgreen"/>
      </div>
      <div class="bg-green-100 flex justify-start items-center">
        <MySVG class="" :matrix="matrixLeftAndRight" :steps="stepsLeftAndRight" :polygonPoints="polygonPointsLeftAndRight" :showCircles="false" :width="dimensions.height" :height="dimensions.depth" color="tomato"/>
      </div>
    </div>

    <div class="flex justify-center flex-row space-x-4 mt-6">
      <DownloadSVG :svgRef="theSVG" />
      <DownloadDXF :matrix="matrixTopAndBottom" />
      <DownloadG_CODE :matrix="matrixTopAndBottom" />
    </div>
  </div>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { MatrixOfHoles } from '@/utils/matrixOfHoles';
import { StepsGenerator } from '@/utils/stepsGenerator';

const theSVG = ref<SVGSVGElement | null>(null);

const matrixTopAndBottom = reactive(new MatrixOfHoles(8, 8, 1, 1, 1, 1, 1));
const matrixFrontAndBack = reactive(new MatrixOfHoles(3, 3, 1, 1, 1, 1, 1));
const matrixLeftAndRight = reactive(new MatrixOfHoles(3, 3, 1, 1, 1, 1, 1));

const stepsTopAndBottom = reactive(new StepsGenerator(7, 7, 2, 2, 2));
const stepsFrontAndBack = reactive(new StepsGenerator(7, 7, 2, 2, 2));
const stepsLeftAndRight = reactive(new StepsGenerator(7, 4, 2, 2, 2));

const submission = () => {
  matrixTopAndBottom.reCalculate(matrixTopAndBottom.holes, matrixTopAndBottom.rows, matrixTopAndBottom.diameter, matrixTopAndBottom.xSpacing, matrixTopAndBottom.ySpacing, matrixTopAndBottom.xMargin, matrixTopAndBottom.yMargin);
  console.log('Submitted!');
};

const dimensions = reactive({
  width: matrixTopAndBottom.width,
  height: 20,
  depth: matrixTopAndBottom.height,
});

const numberOfSteps = reactive({
  width: 3,
  height: 3,
  depth: 3
});

const materialThickness = reactive({
  value: 8
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

// // Watch for changes in holes, holeSpacing, and holeDiameter to recalculate width
// watch([() => matrixTopAndBottom.width, () => matrixTopAndBottom.height, () => stepsTopAndBottom.numberOfStepsHorizontal, () => stepsTopAndBottom.numberOfStepsVertical ], ([newWidth, newHeight, newNumberOfStepsHorizontal, newNumberOfStepsVertical]) => {
//   stepsTopAndBottom.reCalculate(newWidth, newHeight, newNumberOfStepsHorizontal, newNumberOfStepsVertical);
//   dimensions.width = newWidth;
//   dimensions.depth = newHeight;
//   console.log('MATRIX TOP AND BOTTOM CHANGED2!');
// }, { deep: true });

// // Watch for changes in holes, holeSpacing, and holeDiameter to recalculate width
// watch([() => matrixLeftAndRight.width, () => matrixLeftAndRight.height, () => stepsLeftAndRight.numberOfStepsHorizontal, () => stepsLeftAndRight.numberOfStepsVertical ], ([newWidth, newHeight, newNumberOfStepsHorizontal, newNumberOfStepsVertical]) => {
//   stepsLeftAndRight.reCalculate(newWidth, newHeight, newNumberOfStepsHorizontal, newNumberOfStepsVertical);
//   dimensions.height = newWidth;
//   dimensions.depth = newHeight;
//   console.log('MATRIX LEFT AND RIGHT CHANGED!');
// }, { deep: true });

// // Watch for changes in holes, holeSpacing, and holeDiameter to recalculate width
// watch([() => heightInZ.heightInZaxis, () => heightInZ.numberOfStepsInZaxis ], ([newHeightInZ, newNumberOfStepsInZaxis]) => {
//   stepsLeftAndRight.reCalculate(stepsTopAndBottom.width, newHeightInZ, stepsTopAndBottom.numberOfStepsHorizontal, newNumberOfStepsInZaxis);
//   console.log('width height or number of steps changed!')
// }, { deep: true });

const submitted = ref(false);

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

</script>

<style scoped>
/* Custom styling if needed */
</style>
