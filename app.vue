<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
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
        <label for="numberOfStepsHorizontal" class="block text-gray-700"> Nmber of horizontal steps</label>
        <input
          v-model="stepsTopAndBottom.numberOfStepsHorizontal"
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
          v-model="stepsTopAndBottom.numberOfStepsVertical"
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
        <label for="numberOfStepsInZAxis" class="block text-gray-700"> Nmber of vertical steps in Z axis</label>
        <input
          v-model="heightInZ.numberOfStepsInZaxis"
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
          v-model="heightInZ.heightInZaxis"
          id="heightInZAxis"
          type="number"
          :min="stepsTopAndBottom.materialThickness * 2"
          class="w-full mt-2 p-2 border border-gray-300 rounded-md"
          placeholder="Height in Z axis?"
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
    <div>Width: {{ matrixTopAndBottom.width }} mm</div>
    <div>Height: {{ matrixTopAndBottom.height }} mm</div>
    <div>Height in Z axis: {{ heightInZ.heightInZaxis }} mm</div>

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

    <div v-if="submitted" class="grid grid-cols-3">
      <div class="bg-red-100 grid grid-cols-1 place-items-center">
        <MySVG class="w-full" :matrix="matrixLeftAndRight" :steps="stepsLeftAndRight" :polygonPoints="polygonPointsLeftAndRight" :showCircles="false" :width="stepsLeftAndRight.width" :height="stepsLeftAndRight.height" color="deepskyblue"/>
      </div>
      <!-- SVG Representation -->
      <div class="bg-red-100 grid grid-cols-1 h-full">
        <MySVG class="w-full h-full" :matrix="matrixFrontAndBack" :steps="stepsLeftAndRight" :polygonPoints="polygonPointsFrontAndBack" :showCircles="false" :width="stepsFrontAndBack.width" :height="stepsFrontAndBack.height" color="indigo"/>
        <MySVG class="w-full h-full" :matrix="matrixTopAndBottom" :steps="stepsTopAndBottom" :polygonPoints="polygonPointsTopAndBottom" :showCircles="true" :width="stepsTopAndBottom.width" :height="stepsTopAndBottom.height" color="gray"/>
        <MySVG class="w-full h-full" :matrix="matrixFrontAndBack" :steps="stepsLeftAndRight" :polygonPoints="polygonPointsFrontAndBack" :showCircles="false" :width="stepsFrontAndBack.width" :height="stepsFrontAndBack.height" color="forestgreen"/>
      </div>
      <div class="bg-blue-100 grid grid-cols-1 place-items-center">
        <MySVG class="w-full" :matrix="matrixLeftAndRight" :steps="stepsLeftAndRight" :polygonPoints="polygonPointsLeftAndRight" :showCircles="false" :width="stepsLeftAndRight.width" :height="stepsLeftAndRight.height" color="tomato"/>
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
  const heightInZ = reactive({
  numberOfStepsInZaxis: 12,
  heightInZaxis: 5,
  // other properties...
});

const matrixTopAndBottom = reactive(new MatrixOfHoles(3, 3, 1, 1, 1, 1, 1));
const matrixFrontAndBack = reactive(new MatrixOfHoles(3, 3, 1, 1, 1, 1, 1));
const matrixLeftAndRight = reactive(new MatrixOfHoles(3, 3, 1, 1, 1, 1, 1));

const stepsTopAndBottom = reactive(new StepsGenerator(7, 7, 4, 4));
const stepsFrontAndBack = reactive(new StepsGenerator(7, heightInZ.heightInZaxis, 4, heightInZ.numberOfStepsInZaxis));
const stepsLeftAndRight = reactive(new StepsGenerator(7, 4, 4, 8));


//Watch for changes in holes, holeSpacing, and holeDiameter to recalculate width
watch([() => matrixTopAndBottom.holes, () => matrixTopAndBottom.rows, () => matrixTopAndBottom.diameter, () => matrixTopAndBottom.xSpacing, () => matrixTopAndBottom.ySpacing, () => matrixTopAndBottom.xMargin, () => matrixTopAndBottom.yMargin], ([newHoles, newRows, newDiameter, newXspacing, newYspacing, newXmargin, newYmargin]) => {
  matrixTopAndBottom.reCalculate(newHoles, newRows, newDiameter, newXspacing, newYspacing, newXmargin, newYmargin);
  console.log('watch function ran!')
}, { deep: true });

// Watch for changes in holes, holeSpacing, and holeDiameter to recalculate width
watch([() => matrixTopAndBottom.width, () => matrixTopAndBottom.height, () => stepsTopAndBottom.numberOfStepsHorizontal, () => stepsTopAndBottom.numberOfStepsVertical ], ([newWidth, newHeight, newNumberOfStepsHorizontal, newNumberOfStepsVertical]) => {
  stepsTopAndBottom.reCalculate(newWidth, newHeight, newNumberOfStepsHorizontal, newNumberOfStepsVertical);
  console.log('width height or number of steps changed!')
}, { deep: true });

// Watch for changes in holes, holeSpacing, and holeDiameter to recalculate width
watch([() => heightInZ.heightInZaxis, () => heightInZ.numberOfStepsInZaxis ], ([newHeightInZ, newNumberOfStepsInZaxis]) => {
  stepsLeftAndRight.reCalculate(stepsTopAndBottom.width, newHeightInZ, stepsTopAndBottom.numberOfStepsHorizontal, newNumberOfStepsInZaxis);
  console.log('width height or number of steps changed!')
}, { deep: true });


const submitted = ref(false);

const submitForm = () => {
  submitted.value = true;
};


const polygonPointsTopAndBottom = computed(() => {
  let points = '';
  const numberOfStepsHorizontal = stepsTopAndBottom.numberOfStepsHorizontal;
  const numberOfStepsVerticlal = stepsTopAndBottom.numberOfStepsVertical;
  stepsTopAndBottom.currentPosition = { x: stepsTopAndBottom.materialThickness, y: stepsTopAndBottom.materialThickness };

  points += `${stepsTopAndBottom.currentPosition.x},${stepsTopAndBottom.currentPosition.y} `;
  
  for(let i = 0; i < numberOfStepsHorizontal; i++) {
    points += `${stepsTopAndBottom.goRightXplusYzero(stepsTopAndBottom.currentPosition)}`;
  }
  for(let i = 0; i < numberOfStepsVerticlal; i++) {
    points += `${stepsTopAndBottom.goDownXzeroYminus(stepsTopAndBottom.currentPosition)}`;
  }
  for(let i = 0; i < numberOfStepsHorizontal; i++) {
    points += `${stepsTopAndBottom.goLeftXminusYzero(stepsTopAndBottom.currentPosition)}`;
  }
  for(let i = 0; i < numberOfStepsVerticlal; i++) {
    points += `${stepsTopAndBottom.goUpXzeroYminus(stepsTopAndBottom.currentPosition)}`;
  }
  return `${points}`;
});

const polygonPointsFrontAndBack = computed(() => {
  let points = '';
  const numberOfStepsHorizontal = stepsFrontAndBack.numberOfStepsHorizontal;
  const numberOfStepsVerticlal = stepsFrontAndBack.numberOfStepsVertical;
  stepsFrontAndBack.currentPosition = { x: stepsFrontAndBack.materialThickness, y: stepsFrontAndBack.materialThickness };

  points += `${stepsFrontAndBack.currentPosition.x},${stepsFrontAndBack.currentPosition.y} `;
  
  for(let i = 0; i < numberOfStepsHorizontal; i++) {
    points += `${stepsFrontAndBack.goRightXplusYzero(stepsFrontAndBack.currentPosition)}`;
  }
  for(let i = 0; i < numberOfStepsVerticlal; i++) {
    points += `${stepsFrontAndBack.goDownXzeroYminus(stepsFrontAndBack.currentPosition)}`;
  }
  for(let i = 0; i < numberOfStepsHorizontal; i++) {
    points += `${stepsFrontAndBack.goLeftXminusYzero(stepsFrontAndBack.currentPosition)}`;
  }
  for(let i = 0; i < numberOfStepsVerticlal; i++) {
    points += `${stepsFrontAndBack.goUpXzeroYminus(stepsFrontAndBack.currentPosition)}`;
  }
  return `${points}`;
});

const polygonPointsLeftAndRight = computed(() => {
  let points = '';
  const numberOfStepsHorizontal = stepsLeftAndRight.numberOfStepsHorizontal;
  const numberOfStepsVerticlal = stepsLeftAndRight.numberOfStepsVertical;
  stepsLeftAndRight.currentPosition = { x: stepsLeftAndRight.materialThickness, y: stepsLeftAndRight.materialThickness };

  points += `${stepsLeftAndRight.currentPosition.x},${stepsLeftAndRight.currentPosition.y} `;
  
  for(let i = 0; i < numberOfStepsHorizontal; i++) {
    points += `${stepsLeftAndRight.goRightXplusYzero(stepsLeftAndRight.currentPosition)}`;
  }
  for(let i = 0; i < numberOfStepsVerticlal; i++) {
    points += `${stepsLeftAndRight.goDownXzeroYminus(stepsLeftAndRight.currentPosition)}`;
  }
  for(let i = 0; i < numberOfStepsHorizontal; i++) {
    points += `${stepsLeftAndRight.goLeftXminusYzero(stepsLeftAndRight.currentPosition)}`;
  }
  for(let i = 0; i < numberOfStepsVerticlal; i++) {
    points += `${stepsLeftAndRight.goUpXzeroYminus(stepsLeftAndRight.currentPosition)}`;
  }
  return `${points}`;
});



</script>

<style scoped>
/* Custom styling if needed */
</style>
