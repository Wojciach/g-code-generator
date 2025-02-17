<template>
  <div class="p-4">
    <form @submit.prevent="submitForm" class="flex flex-col">
        <fieldset class="fieldSetStyleClass bg-red-500">
          <legend class="text-lg font-semibold text-white">Number of holes</legend>
          <FormField
            v-model="matrixTopAndBottom.holes"
            :iconComponent="Rows"
            displayName="Rows"
            shortName="holes"
            placeholder="Enter number of hole"
          />
          <FormField
            v-model="matrixTopAndBottom.rows"
            :iconComponent="Columns"
            displayName="Columns"
            shortName="holes"
            placeholder="Enter number of hole"
          />
        </fieldset>
        <fieldset class="fieldSetStyleClass bg-blue-500">
          <legend class="text-lg font-semibold text-white">Spacing betweeen holes (mm)</legend>
          <FormField
            v-model="matrixTopAndBottom.xSpacing"
            :iconComponent="Xspacing"
            displayName="Width X axis"
            shortName="holeXspacing"
            placeholder="Enter spacing between holes in X"
          />
          <FormField
            v-model="matrixTopAndBottom.ySpacing"
            :iconComponent="Yspacing"
            displayName="Depth Y axis"
            shortName="holeYspacing"
            placeholder="Enter spacing between holes in Y"
          />
        </fieldset>
        <fieldset class="fieldSetStyleClass bg-green-600">
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
        <fieldset class="fieldSetStyleClass">
          <!-- Hole Diameter -->
          <FormField
              v-model="matrixTopAndBottom.diameter"
              :iconComponent="HoleDiameter"
              displayName="Hole Diameter (mm)"
              shortName="holeDiameter"
              placeholder="Enter hole diameter"
          />
          <!-- Height in Z -->
          <FormField
              v-model="dimensions.height"
              :iconComponent="Height"
              displayName="Height in Z axis"
              shortName="heightInZAxis"
              placeholder="Height in Z axis?"
          />
          <!-- Material thickness -->
          <FormField
              v-model="materialThickness.value"
              :iconComponent="StepsNumberHeight"
              displayName="Material thickness"
              shortName="materialThickness"
              placeholder="Material thickness?"
          />
        </fieldset>
        <fieldset class="fieldSetStyleClass bg-slate-500">
          <legend class="text-lg font-semibold">Number of steps (notches)</legend>
          <!-- Number of horizontal steps -->
          <FormField
            v-model="numberOfSteps.width"
            :iconComponent="StepsNumberWidth"
            displayName="Width"
            shortName="numberOfStepsHorizontal"
            placeholder="How many horizontal steps?"
          />
          <!-- Number of vertical steps -->
          <FormField
            v-model="numberOfSteps.depth"
            :iconComponent="StepsNumberDepth"
            displayName="Depth"
            shortName="numberOfStepsVertical"
            placeholder="How many steps in depth of the box?"
          />
          <!-- Number of vertical steps (in Z axis) -->
          <FormField
            v-model="numberOfSteps.height"
            :iconComponent="StepsNumberHeight"
            displayName="Height"
            shortName="numberOfStepsInZAxis"
            placeholder="How many vertical steps in Z axis?"
          />
        </fieldset>
        <!-- Visual Size Modifier -->
        <div>
          <label for="visualSizeModifier">Visual Size Modifier: {{ visualSizeModifier.value }}</label>
          <input
            id="visualSizeModifier"
            type="range"
            :value="visualSizeModifier.value"
            @input="$emit('update:visualSizeModifier', Number($event.target.value))"
            :min="1"
            :max="20"
            :step="1"
          />
        </div>
        <!-- Submit Button -->
        <!-- <div class="flex justify-center">
          <button type="submit" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Submit
          </button>
        </div> -->
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
import Height from '@/components/form_info_icons/Height.vue';
import HoleDiameter from './form_info_icons/HoleDiameter.vue';
import StepsNumberWidth from './form_info_icons/StepsNumberWidth.vue';
import StepsNumberHeight from './form_info_icons/StepsNumberHeight.vue';
import StepsNumberDepth from './form_info_icons/StepsNumberDepth.vue';
import NewVisualisation3d from './NewVisualisation3d.vue';
  
const props = defineProps<{
    matrixTopAndBottom: MatrixOfHoles;
    numberOfSteps: { width: number; depth: number; height: number };
    materialThickness: { value: number };
    visualSizeModifier: { value: number };
    dimensions: { width: number; depth: number; height: number };
  }>();


const emit = defineEmits(['update:visualSizeModifier']);

</script>

<style scoped>
  .fieldSetStyleClass {
    @apply rounded-md p-2 mt-2 border border-gray-100;
  }
</style>