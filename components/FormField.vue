<template>
  <!-- Number of Holes -->
<div class="singleInputField flex justify-between items-center">
  <div>
    <label :for="shortName" class="block text-gray-200">{{displayName}}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
      :id="shortName"
      type="number"
      min="1"
      class="w-full mt-2 p-2 border border-gray-300 rounded-md"
      :placeholder="placeholder"
      required
    />
  </div>
  <div class="w-20 h-20 flex items-center justify-center bg-blue-500">
    <component :is="iconComponent" v-bind="universalComponentProps" />
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
  universalComponentProps?: any;
}>();

const emit = defineEmits(['update:modelValue']);

</script>

<style>

</style>