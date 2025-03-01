<template>
      <div class="flex flex-row space-x-4 items-center">
        <h2>Current dimensions:</h2>
        <div>Width: {{ dimensions.width }} mm</div>
        <div>Depth: {{ dimensions.depth }} mm</div>
        <div>Height: {{ dimensions.height }} mm</div>
        <div class="bg-red-400">WINDOW WIDTH: {{ widthInfo.value }}</div>
      </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  dimensions: Dimensions;
}>();

const widthInfo = reactive({
  value: typeof window !== 'undefined' ? window.innerWidth : 0
});


const updateWidth = () => {
  widthInfo.value = window.innerWidth;
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