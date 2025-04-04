<template>
  <main class="w-full flex flex-col items-start justify-start relative bg-transparent z-10">
    <article class="flex flex-row justify-between p-6 bg-gray-200 shadow-md rounded-md w-full">
      <Info :dimensions="dimensions" :formWidth="formWidth" />
      <DownloadButtons class="hidden" />
      {{ formWidth }}
    </article>
    <article class="flex flex-row flex-wrap 2xl:flex-nowrap w-full h-full items-start">
      <section ref="formRef" class="flex justify-center flex-grow md:flex-none p-4 rounded-md shadow-md w-fit-content z-50 bg-blue-500">
        <TheForm
          @update:visualSizeModifier="updateVisualSizeModifier"
          :matrixTopAndBottom="matrixTopAndBottom"
          :numberOfSteps="numberOfSteps"
          :materialThickness="materialThickness"
          :visualSizeModifier="visualSizeModifier"
          :dimensions="dimensions"
          class="bg-slate-400 shadow-md"
        />
      </section>
      <section
        :class="{
          'flex flex-col flex-wrap h-full justify-left relative ': true,
          'flex-col ': ((dimensions.width + dimensions.depth + materialThickness.value) * visualSizeModifier.value >= 450),
          //'md:flex-row': ((dimensions.width + dimensions.depth + materialThickness.value) * visualSizeModifier.value < 450),
        }"
      >
        <NewVisualisation3d
          class="m-0 bg-red-500 flex flex-grow justify-center"
          :matrix="matrixTopAndBottom"
          :numberOfSteps="numberOfSteps"
          :materialThickness="materialThickness.value"
          :visualSizeModifier="visualSizeModifier.value"
          :dimensions="dimensions"
          :polygons="polygons"
          :padding="50"
          showInfo="height"
        />
        <Representation_2D
          class="m-0 bg-yellow-300 flex flex-grow"
          :matrix="matrixTopAndBottom"
          :dimensions="dimensions"
          :polygons="polygons"
          :visualSizeModifier="visualSizeModifier.value"
          :materialThickness="materialThickness.value"
        />
        <Grid :gridFactor="gridFactor" />
      </section>
    </article>
  </main>
</template>

<script lang="ts" setup>
import type { Dimensions } from '@/utils/types';
import { reactive, ref } from 'vue';
import { MatrixOfHoles } from '@/utils/matrixOfHoles';
import { usePolygons } from '@/utils/composables/usePolygons';

const formRef = ref(null);
const formWidth = ref(0);

onMounted(() => {
  if (formRef.value) {
    const rect = formRef.value.getBoundingClientRect();
    formWidth.value = rect.width;
  }
});

const formWidth2 = reactive({
  value: typeof window !== 'undefined' ? window.innerWidth : 0
});


const updateWidth2 = () => {
  formWidth2.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateWidth2);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth2);
});

const theSVG = ref<SVGSVGElement | null>(null);
const matrixTopAndBottom = reactive(new MatrixOfHoles(8, 3, 10, 10, 10, 10, 10));
const visualSizeModifier = reactive({
  value: 1
});

const gridFactor = computed(() => {
  return visualSizeModifier.value  * 10;
});
 
const dimensions = reactive<Dimensions>({
  width: matrixTopAndBottom.width,
  height: 200,
  depth: matrixTopAndBottom.height,
});

const numberOfSteps = reactive<Dimensions>({
  width: 3,
  height: 2,
  depth: 2
});

const materialThickness = reactive({
  value: 10
});

const stepSizes = computed(() => {
  return {
    width: (dimensions.width / numberOfSteps.width) /2,
    height: (dimensions.height / numberOfSteps.height) /2,
    depth: (dimensions.depth / numberOfSteps.depth) /2
  };
});

//Watch for changes in holes, holeSpacing, and holeDiameter to recalculate width
watch([() => matrixTopAndBottom.holes, () => matrixTopAndBottom.rows, () => matrixTopAndBottom.diameter, () => matrixTopAndBottom.xSpacing, () => matrixTopAndBottom.ySpacing, () => matrixTopAndBottom.xMargin, () => matrixTopAndBottom.yMargin], ([newHoles, newRows, newDiameter, newXspacing, newYspacing, newXmargin, newYmargin]) => {
  matrixTopAndBottom.reCalculate(newHoles, newRows, newDiameter, newXspacing, newYspacing, newXmargin, newYmargin);
  dimensions.width = matrixTopAndBottom.width;
  dimensions.depth = matrixTopAndBottom.height;
}, { deep: true });

const polygons = computed(() => {
  return usePolygons(numberOfSteps, stepSizes.value, materialThickness.value);
});

const updateVisualSizeModifier = (value) => {
  visualSizeModifier.value = value;
};

</script>

<style scoped>

</style>
