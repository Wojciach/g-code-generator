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
          <!-- y Margin -->
          <FormField
            v-model="matrixTopAndBottom.yMargin"
            :iconComponent="Ymargins"
            displayName="Y Margin (mm)"
            shortName="yMargin"
            placeholder="Y Margin"
          />
        </fieldset>
        <!-- Hole Diameter -->
        <FormField
            v-model="matrixTopAndBottom.diameter"
            :iconComponent="HoleDiameter"
            displayName="Hole Diameter (mm)"
            shortName="holeDiameter"
            placeholder="Enter hole diameter"
        />
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
          <!-- Number of vertical steps -->
          <FormField
            v-model="numberOfSteps.depth"
            :iconComponent="StepsNumberDepth"
            displayName="Nmber of vertical steps (depth)"
            shortName="numberOfStepsVertical"
            placeholder="How many steps in depth of the box?"
          />
          <!-- Number of vertical steps (in Z axis) -->
          <FormField
            v-model="numberOfSteps.height"
            :iconComponent="StepsNumberHeight"
            displayName="Nmber of vertical steps in Z axis (height)"
            shortName="numberOfStepsInZAxis"
            placeholder="How many vertical steps in Z axis?"
          />
        </fieldset>
        <!-- Height in Z -->
        <FormField
            v-model="dimensions.height"
            :iconComponent="Visualisation3d"
            displayName="Height in Z axis"
            shortName="heightInZAxis"
            placeholder="Height in Z axis?"
            :universalComponentProps="{
              matrixFrontAndBack,
              matrixLeftAndRight,
              matrixTopAndBottom,
              stepsTopAndBottom,
              stepsLeftAndRight,
              visualSizeModifier: Number(visualSizeModifier.value),
              materialThickness,
              polygonPointsTopAndBottom,
              polygonPointsFrontAndBack,
              polygonPointsLeftAndRight,
              dimensions,
              submitted
            }"
        />
        <!-- Material thickness -->
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
import StepsNumberDepth from './form_info_icons/StepsNumberDepth.vue';
  
const props = defineProps<{
    matrixTopAndBottom: MatrixOfHoles;
    numberOfSteps: { width: number; depth: number; height: number };
    materialThickness: { value: number };
    visualSizeModifier: { value: number };
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