<template>
  <div class="p-0 w-full">
    <form @submit.prevent="submitForm" class="flex flex-col w-full">
      <section class="flex flex-row z-50">
        <legend @click="setVisiblleTo('holes')" :class="['legendStyleClass bg-red-500 border-red-900', {'-mb-0.5': (visibleFieldSet.value === 'holes')}]"><button>Number of holes</button></legend>
        <legend @click="setVisiblleTo('holeSpacing')" :class="['legendStyleClass bg-blue-500 border-blue-900', {'-mb-0.5': (visibleFieldSet.value === 'holeSpacing')}]"><button>Spacing betweeen holes (mm)</button></legend>
        <legend @click="setVisiblleTo('margins')" :class="['legendStyleClass bg-green-600 border-green-900', {'-mb-0.5': (visibleFieldSet.value === 'margins')}]"><button>Side margins (mm)</button></legend>
        <legend @click="setVisiblleTo('otherVaribles')" :class="['legendStyleClass bg-purple-500 border-purple-900', {'-mb-0.5': (visibleFieldSet.value === 'otherVaribles')}]"><button>Other dimensions (mm)</button></legend>
        <legend @click="setVisiblleTo('steps')" :class="['legendStyleClass bg-gray-500 border-gray-900', {'-mb-0.5': (visibleFieldSet.value === 'steps')}]"><button>Number of notches</button></legend>
      </section>
      <section class="flex flex-col w-full z-0">
        <fieldset v-if="visibleFieldSet.value === 'holes'" class="fieldSetStyleClass bg-red-500 border-red-900">
          <FormField
            class="formFieldStyleClass"
            v-model="matrixTopAndBottom.holes"
            :iconComponent="Rows"
            displayName="Rows"
            shortName="holes"
            placeholder="Enter number of hole"
          />
          <FormField
            class="formFieldStyleClass"
            v-model="matrixTopAndBottom.rows"
            :iconComponent="Columns"
            displayName="Columns"
            shortName="holes"
            placeholder="Enter number of hole"
          />
        </fieldset>
        <fieldset v-if="visibleFieldSet.value === 'holeSpacing'" class="fieldSetStyleClass bg-blue-500 border-blue-900">
          <FormField
						class="formFieldStyleClass"
            v-model="matrixTopAndBottom.xSpacing"
            :iconComponent="Xspacing"
            displayName="Width X axis"
            shortName="holeXspacing"
            placeholder="Enter spacing between holes in X"
          />
          <FormField
						class="formFieldStyleClass"
            v-model="matrixTopAndBottom.ySpacing"
            :iconComponent="Yspacing"
            displayName="Depth Y axis"
            shortName="holeYspacing"
            placeholder="Enter spacing between holes in Y"
          />
        </fieldset>
        <fieldset v-if="visibleFieldSet.value === 'margins'" class="fieldSetStyleClass bg-green-600 border-green-900">
          <!-- x Margin -->
          <FormField
						class="formFieldStyleClass"
            v-model="matrixTopAndBottom.xMargin"
            :iconComponent="Xmargins"
            displayName="X axis Margin"
            shortName="xMargin"
            placeholder="X Margin"
          />
          <!-- y Margin -->
          <FormField
						class="formFieldStyleClass"
            v-model="matrixTopAndBottom.yMargin"
            :iconComponent="Ymargins"
            displayName="Y axis Margin"
            shortName="yMargin"
            placeholder="Y Margin"
          />
        </fieldset>
        <fieldset v-if="visibleFieldSet.value === 'otherVaribles'" class="fieldSetStyleClass bg-purple-500 border-purple-900">
          <!-- Hole Diameter -->
          <FormField
              class="formFieldStyleClass"
              v-model="matrixTopAndBottom.diameter"
              :iconComponent="HoleDiameter"
              displayName="Hole Diameter"
              shortName="holeDiameter"
              placeholder="Enter hole diameter"
          />
          <!-- Height in Z -->
          <FormField
						  class="formFieldStyleClass"
              v-model="dimensions.height"
              :iconComponent="Height"
              displayName="Height in Z axis"
              shortName="heightInZAxis"
              placeholder="Height in Z axis?"
          />
          <!-- Material thickness -->
          <FormField
						  class="formFieldStyleClass"
              v-model="materialThickness.value"
              :iconComponent="Thickness"
              displayName="Wall thickness"
              shortName="materialThickness"
              placeholder="Material thickness?"
          />
        </fieldset>
        <fieldset v-if="visibleFieldSet.value === 'steps'" class="fieldSetStyleClass bg-gray-500 border-gray-900">
          <!-- Number of horizontal steps/notches -->
          <FormField
					  class="formFieldStyleClass"
            v-model="numberOfSteps.width"
            :iconComponent="StepsNumberWidth"
            displayName="Width"
            shortName="numberOfStepsHorizontal"
            placeholder="How many horizontal steps?"
          />
          <!-- Number of vertical steps/notches -->
          <FormField
						class="formFieldStyleClass"
            v-model="numberOfSteps.depth"
            :iconComponent="StepsNumberDepth"
            displayName="Depth"
            shortName="numberOfStepsVertical"
            placeholder="How many steps in depth of the box?"
          />
          <!-- Number of vertical steps/notches (in Z axis) -->
          <FormField
						class="formFieldStyleClass"
            v-model="numberOfSteps.height"
            :iconComponent="StepsNumberHeight"
            displayName="Height"
            shortName="numberOfStepsInZAxis"
            placeholder="How many vertical steps in Z axis?"
          />
        </fieldset>
        <div class="flex items-center">
          <input
            @input="$emit('update:throughHoles', $event.target.checked)"
            id="checkbox"
            type="checkbox"
            class="form-checkbox h-8 w-8 text-blue-600"
          />
          <label for="checkbox" class="ml-2 text-gray-700">Through holes</label>
              </div>
      </section>
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

const emit = defineEmits(['update:visualSizeModifier', 'update:throughHoles']);

const visibleFieldSet = reactive({
  value: 'holes'
});

const setVisiblleTo = (value: string) => {
  visibleFieldSet.value = value;
};

</script>

<style scoped>

.legendStyleClass {
    @apply text-lg font-semibold text-white p-1 px-3 rounded-xl rounded-b-none border-2 border-b-0;
  }

  fieldset {
    @apply flex flex-row items-center justify-center border-2 rounded-md rounded-tl-none p-2 mb-2 w-full;
  }

  .formFieldStyleClass {
    @apply mx-6;
  }
</style>