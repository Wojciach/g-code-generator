<template>
  <!-- Number of Holes -->
<div class="singleInputField flex justify-start items-center">
  <div class="w-10 h-10 m-1 flex items-center justify-center bg-blue-500 overflow-hidden rounded-lg border-2 border-gray-900">
    <component :is="iconComponent"/>
  </div>
  <div class="flex flex-row items-center">
    <div class="flex flex-row items-center justify-center w-fit-content mx-4">
      <button class="buttonClass">
        <ArrowheadIcon @click="decrease"/>
      </button>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', Number($event.target.value))"
        :id="shortName"
        type="number"
        min="1"
        class="w-11 h-8 mx-0.5 p-2 border border-gray-300 rounded-md text-center"
        :placeholder="placeholder"
        required
      />
      <button class="buttonClass">
        <ArrowheadIcon @click="increase" class="rotate-180" />
      </button>
    </div>
    <label :for="shortName" class="block text-gray-200 whitespace-nowrap">{{displayName}}</label>
  </div>
</div>
  
</template>

<script lang="ts" setup>

// Dynamically import the component based on the iconComponent prop
const asyncIconComponent = defineAsyncComponent(() => import(`@/components/form_info_icons/${props.iconComponent}.vue`));

const props = defineProps<{
    displayName: string;
    shortName: string;
    placeholder: string;
    iconComponent: any;
    modelValue: number | string;
  }>();

const emit = defineEmits(['update:modelValue']);

const decrease = () => {
  let number = Number(props.modelValue);
  if (number > 1) {
    emit('update:modelValue', number - 1);
  }
};
const increase = () => {
  let number = Number(props.modelValue);
    emit('update:modelValue', number + 1);
};


</script>

<style scoped>
/* Hide the default arrows in input type number */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

.buttonClass {
  background-color: transparent;
  @apply w-3 h-6;
}
</style>