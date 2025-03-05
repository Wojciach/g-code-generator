<template>
  <main class="w-full flex flex-col items-start justify-start relative bg-transparent z-10">
    <article class="flex flex-row justify-between p-6 bg-gray-200 shadow-md rounded-md w-full">
      <Info :dimensions="dimensions" :formWidth="formWidth" />
      <DownloadButtons v-if="false" class="hidden" />
      {{ formWidth }}
    </article>
    <!-- <article class="grid grid-cols-[auto,auto,auto] gap-0 justify-center w-fit-content bg-green-200"> -->
    <article class="flex flex-row flex-wrap justify-left w-fit-content mt-8">
        <TheForm
          @update:visualSizeModifier="updateVisualSizeModifier"
          :matrixTopAndBottom="matrixTopAndBottom"
          :numberOfSteps="numberOfSteps"
          :materialThickness="materialThickness"
          :visualSizeModifier="visualSizeModifier"
          :dimensions="dimensions"
          class="m-0 "
        />
          <NewVisualisation3d
            class="m-0  "
            :matrix="matrixTopAndBottom"
            :numberOfSteps="numberOfSteps"
            :materialThickness="materialThickness.value"
            :dimensions="dimensions"
            :polygons="polygons"
            :padding="50"
            showInfo="height"
            :showScaleButton="false"
            :visualSizeModifier="visualSizeModifier.value"
          />
          <Representation_2D
            class="m-0 "
            :matrix="matrixTopAndBottom"
            :dimensions="dimensions"
            :polygons="polygons"
            :materialThickness="materialThickness.value"
            :visualSizeModifier="visualSizeModifier.value"
          />
        <Grid :gridFactor="(gridFactor * 5)"/>
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
