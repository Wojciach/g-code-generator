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
      </ul>
    </div>

    <!-- SVG Representation -->
    <div v-if="submitted" class="mt-6 flex justify-center">
      <svg ref="theSVG" :viewBox="'0 0 ' + matrix.width + ' ' + matrix.height" xmlns="http://www.w3.org/2000/svg" class="border border-gray-600 bg-slate-400">
        <rect 
          :x="0" 
          :y="0" 
          :width="matrix.width" 
          :height="matrix.height" 
          fill="lightgray" 
          stroke="red" 
          stroke-width="0.1" 
        />
        <!-- Circles -->
        <circle
          v-for="n in matrix.xyPositions"
          :key="`${n[0]}-${n[1]}`"
          :cx="n[0]"
          :cy="n[1]" 
          :r="matrix.diameter / 2" 
          fill="blue" />
      </svg>
    </div>
    <DownloadSVG :svgRef="theSVG"/>
    <DownloadDXF />
  </div>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { MatrixOfHoles } from '@/utils/matrixOfHoles';

const theSVG = ref<SVGSVGElement | null>(null);

const matrix = reactive(new MatrixOfHoles(3, 3, 1, 1, 1, 1, 1));

const form = reactive({
  holes: 0,
  width: 0,
  height: 0,
  holeSpacing: 0,
  holeDiameter: 0
});

// Watch for changes in holes, holeSpacing, and holeDiameter to recalculate width
watch([() => matrix.holes, () => matrix.rows, () => matrix.diameter, () => matrix.xSpacing, () => matrix.ySpacing, () => matrix.xMargin, () => matrix.yMargin], ([newHoles, newRows, newDiameter, newXspacing, newYspacing, newXmargin, newYmargin]) => {
  matrix.reCalculate(newHoles, newRows, newDiameter, newXspacing, newYspacing, newXmargin, newYmargin);
  console.log('watch function ran!')
}, { deep: true });

const submitted = ref(false);

const submitForm = () => {
  submitted.value = true;
  console.log(form);
};

</script>

<style scoped>
/* Custom styling if needed */
</style>
