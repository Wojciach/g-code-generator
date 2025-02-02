<template>
  <div class="p-4">
    <form @submit.prevent="submitForm" class="flex flex-col ">
        <!-- Number of Holes -->
        <div class="singleInputField">
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
        <div class="singleInputField">
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
        <div class="singleInputField">
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
        <div class="singleInputField">
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
        <div class="singleInputField">
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
        <div class="singleInputField">
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
        <div class="singleInputField">
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
        <div class="singleInputField">
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
        <div class="singleInputField">
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
        <div class="singleInputField">
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
        <div class="singleInputField">
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
        <div class="singleInputField">
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
          <div>
            <label for="visualSizeModifier">Visual Size Modifier: {{ visualSizeModifier.value }}</label>
            <input
              id="visualSizeModifier"
              type="range"
              v-model="visualSizeModifier.value"
              :min="1"
              :max="20"
              :step="1"
            />
          </div>
        <!-- Submit Button -->
        <div class="flex justify-center">
          <button type="submit" @click="emission" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
    matrixTopAndBottom: MatrixOfHoles;
    numberOfSteps: { width: number; depth: number; height: number };
    materialThickness: { value: number };
    visualSizeModifier: { value: string };
    dimensions: { width: number; depth: number; height: number };
  }>();

const data = () => {
  return  'returned data'
}

const emit = defineEmits(['update']);

const emission = () => {
  console.log('emission')
  emit('update', data())
}


</script>

<style>

</style>