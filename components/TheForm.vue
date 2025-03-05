<template>
  <div class="p-4 pt-0">
    <form @submit.prevent="submitForm" class="flex flex-col">
        <fieldset class="fieldSetStyleClass bg-red-500 border-red-900">
          <legend class="bg-red-900">Number of holes</legend>
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
        <fieldset class="fieldSetStyleClass bg-blue-500 border-blue-900">
          <legend class="bg-blue-900">Spacing betweeen holes (mm)</legend>
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
        <fieldset class="fieldSetStyleClass bg-green-600 border-green-900">
          <legend class="bg-green-900">Side margins (mm)</legend>
          <!-- x Margin -->
          <FormField
            v-model="matrixTopAndBottom.xMargin"
            :iconComponent="Xmargins"
            displayName="X axis Margin"
            shortName="xMargin"
            placeholder="X Margin"
          />
          <!-- y Margin -->
          <FormField
            v-model="matrixTopAndBottom.yMargin"
            :iconComponent="Ymargins"
            displayName="Y axis Margin"
            shortName="yMargin"
            placeholder="Y Margin"
          />
        </fieldset>
        <fieldset class="fieldSetStyleClass bg-purple-500 border-purple-900">
          <legend class="legendStyleClass bg-purple-900">Other dimensions (mm)</legend>
          <!-- Hole Diameter -->
          <FormField
              v-model="matrixTopAndBottom.diameter"
              :iconComponent="HoleDiameter"
              displayName="Hole Diameter"
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
              :iconComponent="Thickness"
              displayName="Wall thickness"
              shortName="materialThickness"
              placeholder="Material thickness?"
          />
        </fieldset>
        <fieldset class="fieldSetStyleClass bg-slate-500 border-gray-900">
          <legend class="bg-gray-900">Number of notches</legend>
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
          <label for="visualSizeModifier">Grid scale: {{ Math.round(visualSizeModifier.value * 6.36 )}}</label>
          <input
            id="visualSizeModifier"
            type="range"
            :value="visualSizeModifier.value"
            @input="$emit('update:visualSizeModifier', Number($event.target.value))"
            :min="0.1"
            :max="3"
            :step="0.1"
          />
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
import Thickness from '@/components/form_info_icons/Thickness.vue';
import Height from '@/components/form_info_icons/Height.vue';
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


const emit = defineEmits(['update:visualSizeModifier']);

</script>

<style scoped>

  legend {
    @apply text-lg font-semibold text-white p-1 px-3 rounded-xl border-gray-900 border-2;
  }

  fieldset {
    @apply border-2 rounded-md p-2 mb-2;
  }
</style>