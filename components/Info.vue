<template>
      <div class="flex flex-row space-x-4 items-center">
        <h2>Current dimensions:</h2>
        <div>Width: <b>{{ dimensions.width + (materialThickness * 2)}} mm</b></div>
        <div>Depth: <b>{{ dimensions.depth + (materialThickness * 2)}} mm</b></div>
        <div>Height: <b>{{ dimensions.height + (materialThickness * 2)}} mm</b></div>
        <!-- <div class="bg-red-400">WINDOW WIDTH: {{ widthInfo.value }}</div> -->
      </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  dimensions: Dimensions;
  materialThickness: number;
  matrixTopAndBottom: MatrixOfHoles;
}>();

const widthInfo = reactive({
  value: typeof window !== 'undefined' ? document.documentElement.clientWidth : 0
});


const updateWidth = () => {
  widthInfo.value = document.documentElement.clientWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth);
});

</script>

<style>

</style>