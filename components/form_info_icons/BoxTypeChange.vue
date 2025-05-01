<template>
  <div class="flex flex-col items-start space-y-2">
    <select
      id="options"
      v-model="boxx.value"
      @change="logBoxValue"
      class=" px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="" disabled>Choose Box Type</option>
      <option value="openTop">Open top</option>
      <option value="holes" selected>Holes</option>
      <option value="lid" selected>Lid</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
const boxx = inject('providedBoxType');

const logBoxValue = () => {
  console.log('Box Type Changed:', boxx.value);
};

</script>

<style>

</style>