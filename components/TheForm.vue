<template>
  <div class="p-4">
    <form @submit.prevent="submitForm" class="flex flex-col">

        <fieldset class="bg-red-500 border border-grey-300 rounded-md p-4">
          <legend class="text-lg font-semibold text-white">Holes</legend>

          <FormField
            v-model="matrixTopAndBottom.holes"
            :iconComponent="Rows"
            displayName="Number of Holes"
            shortName="holes"
            placeholder="Enter number of hole"
          />
          <FormField
            v-model="matrixTopAndBottom.rows"
            :iconComponent="Columns"
            displayName="Number of Holes"
            shortName="holes"
            placeholder="Enter number of hole"
          />

          <!-- Number of Holes -->
          <!-- <div class="singleInputField flex justify-between items-center">
            <div>
              <label for="holes" class="block text-gray-200">Number of Holes</label>
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
            <div class="w-20 h-20 flex items-center justify-center bg-blue-500">
              <Rows />
            </div>
          </div> -->

          <!-- Number of Rows -->
          <!-- <div class="singleInputField flex justify-between items-center">
            <div>
              <label for="holes" class="block text-gray-200">Number of Rows</label>
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
            <div class="w-20 h-20 flex items-center justify-center bg-blue-500">
              <Rows class="rotate-90" />
            </div>
          </div> -->
        </fieldset>

        <fieldset class="mt-4 bg-blue-500 border border-grey-300 rounded-md p-4">
          <legend class="text-lg font-semibold text-white">Spacing</legend>

          <FormField
            v-model="matrixTopAndBottom.xSpacing"
            :iconComponent="Xspacing"
            displayName="X Spacing Between Holes in X axis (mm)"
            shortName="holeXspacing"
            placeholder="Enter spacing between holes in X"
          />

          <FormField
            v-model="matrixTopAndBottom.ySpacing"
            :iconComponent="Yspacing"
            displayName="Y Spacing Between Holes in Y axis (mm)"
            shortName="holeYspacing"
            placeholder="Enter spacing between holes in Y"
          />

          <!-- x spacing Between Holes in x axis-->
          <!-- <div class="singleInputField flex justify-between items-center">
            <div>
              <label for="holeXspacing" class="block text-gray-700"> X Spacing Between Holes in X axis (mm)</label>
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
            <div class="w-20 h-20 flex items-center justify-center bg-blue-500">
              <Xspacing />
            </div>
          </div> -->

          <!-- Y Between Holes in Y axis -->
          <!-- <div class="singleInputField flex justify-between items-center">
            <div>
              <label for="holeYspacing" class="block text-gray-700"> Y Spacing Between Holes in Y axis (mm)</label>
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
            <div class="w-20 h-20 flex items-center justify-center bg-blue-500">
              <Xspacing class="rotate-90" />
            </div>
          </div> -->
        </fieldset>

        <fieldset class="mt-4 bg-green-600 border border-grey-300 rounded-md p-4">
          <legend class="text-lg font-semibold">Margins</legend>

          <!-- x Margin -->
          <FormField
            v-model="matrixTopAndBottom.xMargin"
            :iconComponent="Xmargins"
            displayName="X Margin (mm)"
            shortName="xMargin"
            placeholder="X Margin"
          />

          <!-- x Margin -->
          <!-- <div class="singleInputField">
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
          </div> -->

          <!-- y Margin -->
          <FormField
            v-model="matrixTopAndBottom.yMargin"
            :iconComponent="Ymargins"
            displayName="Y Margin (mm)"
            shortName="yMargin"
            placeholder="Y Margin"
          />

          <!-- y Margin -->
          <!-- <div class="singleInputField">
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
          </div> -->
        </fieldset>

        <!-- Hole Diameter -->
        <FormField
            v-model="matrixTopAndBottom.diameter"
            :iconComponent="HoleDiameter"
            displayName="Hole Diameter (mm)"
            shortName="holeDiameter"
            placeholder="Enter hole diameter"
        />

        <!-- Hole Diameter -->
        <!-- <div class="singleInputField">
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
        </div> -->

        <fieldset class="mt-4 bg-slate-500 border border-gray-300 rounded-md p-4">
          <legend class="text-lg font-semibold">Steps</legend>

          <!-- Number of horizontal steps -->
          <FormField
            v-model="numberOfSteps.width"
            :iconComponent="StepsNumberWidth"
            displayName="Nmber of horizontal steps (width)"
            shortName="numberOfStepsHorizontal"
            placeholder="How many horizontal steps?"
          />
          <!-- Number of horizontal steps -->
          <!-- <div class="singleInputField">
            <label for="numberOfStepsHorizontal" class="block text-gray-900">Nmber of horizontal steps (width)</label>
            <input
              v-model="numberOfSteps.width"
              id="numberOfStepsHorizontal"
              type="number"
              :min="1"
              class="w-full mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="How many horizontal steps?"
              required
              />
          </div> -->

          <!-- Number of vertical steps -->
          <div class="singleInputField">
            <label for="numberOfStepsVertical" class="block text-gray-900"> Nmber of vertical steps (depth)</label>
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
          <FormField
            v-model="numberOfSteps.height"
            :iconComponent="StepsNumberHeight"
            displayName="Nmber of vertical steps in Z axis (height)"
            shortName="numberOfStepsInZAxis"
            placeholder="How many vertical steps in Z axis?"
          />
          <!-- Number of vertical steps (in Z axis) -->
          <!-- <div class="singleInputField">
            <label for="numberOfStepsInZAxis" class="block text-gray-900"> Nmber of vertical steps in Z axis (height)</label>
            <input
              v-model="numberOfSteps.height"
              id="numberOfStepsInZAxis"
              type="number"
              :min="1"
              class="w-full mt-2 p-2 border border-gray-300 rounded-md"
              placeholder="How many vertical steps in Z axis?"
              required
              />
            </div> -->
        </fieldset>

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
import Rows from '@/components/form_info_icons/Rows.vue';
import Columns from '@/components/form_info_icons/Columns.vue';
import Xspacing from '@/components/form_info_icons/Xspacing.vue';
import Yspacing from '@/components/form_info_icons/Yspacing.vue';
import Xmargins from '@/components/form_info_icons/Xmargins.vue';
import Ymargins from '@/components/form_info_icons/Ymargins.vue';
import HoleDiameter from './form_info_icons/HoleDiameter.vue';
import StepsNumberWidth from './form_info_icons/StepsNumberWidth.vue';
import StepsNumberHeight from './form_info_icons/StepsNumberHeight.vue';



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