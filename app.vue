<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
    <h2 class="text-2xl font-bold mb-6 text-center">Input Form</h2>

    <form @submit.prevent="submitForm">
      <!-- Number of Holes -->
      <div class="mb-4">
        <label for="holes" class="block text-gray-700">Number of Holes</label>
        <input
          v-model="matrix.holes"
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
          v-model="matrix.rows"
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
          v-model="matrix.xSpacing"
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
          v-model="matrix.ySpacing"
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
          v-model="matrix.xMargin"
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
          v-model="matrix.yMargin"
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
          v-model="matrix.diameter"
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
        <label for="numberOfStepsHorizontal" class="block text-gray-700"> Nmber of horizontal steps</label>
        <input
          v-model="steps.numberOfStepsHorizontal"
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
        <label for="numberOfStepsVertical" class="block text-gray-700"> Nmber of vertical steps</label>
        <input
          v-model="steps.numberOfStepsVertical"
          id="numberOfStepsVertical"
          type="number"
          :min="1"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="How many vertical steps?"
          required
          />
        </div>
      <!-- Submit Button -->
      <div class="flex justify-center">
        <button type="submit" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Submit
        </button>
      </div>
    </form>
    <div>Width: {{ matrix.width }} mm</div>
    <div>Height: {{ matrix.height }} mm</div>

    <!-- Output Display -->
    <div v-if="submitted" class="mt-6 bg-gray-100 p-4 rounded-md">
      <h3 class="text-xl font-bold mb-4">Form Data</h3>
      <ul>
        <li><strong>Number of Holes:</strong> {{ matrix.holes }}</li>
        <li><strong>Number of Rows:</strong> {{ matrix.rows }}</li>
        <li><strong>Spacing Between Holes in X:</strong> {{ matrix.xSpacing }} mm</li>
        <li><strong>Spacing Between Holes in Y:</strong> {{ matrix.ySpacing }} mm</li>
        <li><strong>Margin X:</strong> {{ matrix.xMargin }} mm</li>
        <li><strong>Margin Y:</strong> {{ matrix.yMargin }} mm</li>
        <li><strong>Hole Diameter:</strong> {{ matrix.diameter }} mm</li>
        <li><strong>Number of horizontal steps:</strong> {{ steps.numberOfStepsHorizontal}}</li>
        <li><strong>Number of vertical steps:</strong> {{ steps.numberOfStepsVertical}}</li>
      </ul>
    </div>

    <!-- SVG Representation -->
    <div v-if="submitted" class="mt-6 flex-col justify-center">
      <MySVG :matrix="matrix2" :steps="steps2" :polygonPoints="polygonPoints2" :showCircles="false" :heightInZ="4" color="indigo"/>
      <MySVG :matrix="matrix" :steps="steps" :polygonPoints="polygonPoints" :showCircles="true" color="gray"/>
      <MySVG :matrix="matrix2" :steps="steps2" :polygonPoints="polygonPoints2" :showCircles="false" :heightInZ="4" color="forestgreen"/>
    </div>

    <div class="flex justify-center flex-row space-x-4 mt-6">
      <DownloadSVG :svgRef="theSVG" />
      <DownloadDXF :matrix="matrix" />
      <DownloadG_CODE :matrix="matrix" />
    </div>
  </div>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { MatrixOfHoles } from '@/utils/matrixOfHoles';
import { StepsGenerator } from '@/utils/stepsGenerator';

const theSVG = ref<SVGSVGElement | null>(null);

const matrix = reactive(new MatrixOfHoles(3, 3, 1, 1, 1, 1, 1));
const matrix2 = reactive(new MatrixOfHoles(3, 3, 1, 1, 1, 1, 1));
const steps = reactive(new StepsGenerator(7, 7, 4, 4));
const steps2 = reactive(new StepsGenerator(7, 4, 4, 8));


// Watch for changes in holes, holeSpacing, and holeDiameter to recalculate width
watch([() => matrix.holes, () => matrix.rows, () => matrix.diameter, () => matrix.xSpacing, () => matrix.ySpacing, () => matrix.xMargin, () => matrix.yMargin], ([newHoles, newRows, newDiameter, newXspacing, newYspacing, newXmargin, newYmargin]) => {
  matrix.reCalculate(newHoles, newRows, newDiameter, newXspacing, newYspacing, newXmargin, newYmargin);
  console.log('watch function ran!')
}, { deep: true });

// Watch for changes in holes, holeSpacing, and holeDiameter to recalculate width
watch([() => matrix.width, () => matrix.height, () => steps.numberOfStepsHorizontal, () => steps.numberOfStepsVertical ], ([newWidth, newHeight, newNumberOfStepsHorizontal, newNumberOfStepsVertical]) => {
  steps.reCalculate(newWidth, newHeight, newNumberOfStepsHorizontal, newNumberOfStepsVertical);
  console.log('width height or number of steps changed!')
}, { deep: true });

const submitted = ref(false);

const submitForm = () => {
  submitted.value = true;
};


const polygonPoints = computed(() => {
  let points = '';
  const numberOfStepsHorizontal = steps.numberOfStepsHorizontal;
  const numberOfStepsVerticlal = steps.numberOfStepsVertical;
  steps.currentPosition = { x: steps.materialThickness, y: steps.materialThickness };

  points += `${steps.currentPosition.x},${steps.currentPosition.y} `;
  
  for(let i = 0; i < numberOfStepsHorizontal; i++) {
    points += `${steps.goRightXplusYzero(steps.currentPosition)}`;
  }
  for(let i = 0; i < numberOfStepsVerticlal; i++) {
    points += `${steps.goDownXzeroYminus(steps.currentPosition)}`;
  }
  for(let i = 0; i < numberOfStepsHorizontal; i++) {
    points += `${steps.goLeftXminusYzero(steps.currentPosition)}`;
  }
  for(let i = 0; i < numberOfStepsVerticlal; i++) {
    points += `${steps.goUpXzeroYminus(steps.currentPosition)}`;
  }
  
  return `${points}`;
});

const polygonPoints2 = computed(() => {
  let points = '';
  const numberOfStepsHorizontal = steps2.numberOfStepsHorizontal;
  const numberOfStepsVerticlal = steps2.numberOfStepsVertical;
  steps2.currentPosition = { x: steps2.materialThickness, y: steps2.materialThickness };

  points += `${steps2.currentPosition.x},${steps2.currentPosition.y} `;
  
  for(let i = 0; i < numberOfStepsHorizontal; i++) {
    points += `${steps2.goRightXplusYzero(steps2.currentPosition)}`;
  }
  for(let i = 0; i < numberOfStepsVerticlal; i++) {
    points += `${steps2.goDownXzeroYminus(steps2.currentPosition)}`;
  }
  for(let i = 0; i < numberOfStepsHorizontal; i++) {
    points += `${steps2.goLeftXminusYzero(steps2.currentPosition)}`;
  }
  for(let i = 0; i < numberOfStepsVerticlal; i++) {
    points += `${steps2.goUpXzeroYminus(steps2.currentPosition)}`;
  }
  
  return `${points}`;
});



</script>

<style scoped>
/* Custom styling if needed */
</style>
