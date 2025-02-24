<template>
  <!-- Number of Holes -->
<div class="singleInputField flex justify-start items-center">
  <div class="w-10 h-10 m-1 flex items-center justify-center bg-blue-500 overflow-hidden">
    <component :is="iconComponent"/>
  </div>
  <div class="flex flex-row items-center">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
      :id="shortName"
      type="number"
      min="1"
      class="w-16 h-8 mt-1 mx-4 p-2 border border-gray-300 rounded-md"
      :placeholder="placeholder"
      required
    />
    <label :for="shortName" class="block text-gray-200 whitespace-nowrap">{{displayName}}</label>
  </div>

</div>
  
</template>

<script lang="ts" setup> 
defineProps<{
  displayName: string;
  shortName: string;
  placeholder: string;
  iconComponent: any;
  modelValue: number | string;
}>();

const emit = defineEmits(['update:modelValue']);

</script>

<style>

</style>