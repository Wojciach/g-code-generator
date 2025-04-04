<template>
  <main ref="main" class="flex flex-col justify-center h-full w-fit-content bg-red-500" :style="{backgroundColor: colors.mainBg}">
    <article ref="info" class="flex justify-center p-4">
      <Info
        :materialThickness="materialThickness.value"
        :dimensions="dimensions"
        :formWidth="formWidth"
        :matrixTopAndBottom="matrixTopAndBottom"
      />
    </article>
    <!-- <article class="grid grid-cols-[auto,auto,auto] gap-0 justify-center w-fit-content bg-green-200"> -->
    <article class="flex landscape:flex-row portrait:flex-col-reverse h-fit-content">
      <section class="flex landscape:w-fit-content">
        <TheForm
          v-show="(formType.value === 'TheForm')"
          @update:visualSizeModifier="updateVisualSizeModifier"
          @update:throughHoles="updateThroughHoles"
          :matrixTopAndBottom="matrixTopAndBottom"
          :numberOfSteps="numberOfSteps"
          :materialThickness="materialThickness"
          :visualSizeModifier="visualSizeModifier"
          :dimensions="dimensions"
          class="flex flex-grow items-center justify-center mt-2 mb-5 mx-5 portrait:mx-20"
          :v-model="myNumber"
        />
      </section>
      <section class="flex flex-col justify-center items-center flex-grow w-full">
          <div id="intercheangeableVisualisation" class="relative flex flex-grow flex-col justify-center items-center h-full w-full min-h-[600px]">
            <NewVisualisation3d
              v-show="selectedView === '3D'"
              class="z-20 flex m-0"
              :matrix="matrixTopAndBottom"
              :numberOfSteps="numberOfSteps"
              :materialThickness="materialThickness.value"
              :dimensions="dimensions"
              :polygons="{top: polygons.top, front: polygons.frontAndBack, right: polygons.leftAndRight}"
              :padding="50"
              showInfo="height"
              :showScaleButton="false"
              :visualSizeModifier="visualSizeModifier.value"
            />
            <Representation_2D
              v-show="selectedView === '2D'"
              class="m-0 z-20"
              :matrix="matrixTopAndBottom"
              :dimensions="dimensions"
              :polygons="{top: polygons.top, bottom: polygons.bottom, front: polygons.frontAndBack, back: polygons.frontAndBack, left: polygons.leftAndRight, right: polygons.leftAndRight}"
              :materialThickness="materialThickness.value"
              :visualSizeModifier="visualSizeModifier.value"
              :throughHoles="throughHoles.value"
            />
            <DownloadSVG class="z-20" v-show="selectedView === 'Download'" />
            <Grid :gridFactor="gridFactor" class="bg-red-900 z-10"/>
          </div>
          <div class="p-2 pb-4 flex flex-col w-full  justify-center items-center bg-gray-300">
            <VisualSizeModifier
              class="flex flex-row flex-wrap justify-center items-center bg-gray-200 p-2 px-4 rounded-2xl"
              @update:visualSizeModifier="updateVisualSizeModifier"
              :visualSizeModifier="visualSizeModifier.value"
            />
            <SelectViewButtons v-model="selectedView" class="flex flex-row flex-wrap justify-center items-center py-2" />
              <AlternativeForm
              v-show="(formType.value === 'alternativeForm')"
              @update:visualSizeModifier="updateVisualSizeModifier"
              @update:throughHoles="updateThroughHoles"
              :matrixTopAndBottom="matrixTopAndBottom"
              :numberOfSteps="numberOfSteps"
              :materialThickness="materialThickness"
              :visualSizeModifier="visualSizeModifier"
              :dimensions="dimensions"
              class="flex flex-row flex-grow items-center justify-center mt-2 mb-5 mx-5 portrait:mx-20"
              :v-model="myNumber"
            />
          </div>
      </section>
    </article>
  </main>
</template>

<script lang="ts" setup>
import type { Dimensions } from '@/utils/types';
import { reactive, ref } from 'vue';
import { MatrixOfHoles } from '@/utils/matrixOfHoles';
import { usePolygons } from '@/utils/composables/usePolygons';
import { usePolygonsForOpenTop } from '@/utils/composables/usePolygonsForOpenTop';
import VisualSizeModifier from './components/buttonSets/VisualSizeModifier.vue';
import SelectViewButtons from './components/buttonSets/SelectViewButtons.vue';
import DownloadSection from './components/DownloadSection.vue';

const selectedView = ref('3D')
const formType = reactive({value: 'TheForm'});
const changeFormType = (type: string) => {
  formType.value = type;
};
provide('changeFormType', changeFormType);

const main = ref(null);
const info = ref(null);
const infoHeight = ref(0);
const formRef = ref(null);
const formWidth = ref(0);
const myNumber = ref(true);

const formWidth2 = reactive({
  value: typeof window !== 'undefined' ? window.innerWidth : 0
});

const matrixTopAndBottom = reactive(new MatrixOfHoles(8, 5, 10, 10, 10, 10, 10));
provide('providedMatrix', matrixTopAndBottom);

const visualSizeModifier = reactive({
  value: 1
});
provide('providedVisualSizeModifier', visualSizeModifier);

const throughHoles = reactive({
  value: false
});
provide('providedThroughHoles', throughHoles);

const gridFactor = computed(() => {
  return visualSizeModifier.value  * 50;
});
 
const dimensions = reactive<Dimensions>({
  width: matrixTopAndBottom.width,
  height: 200,
  depth: matrixTopAndBottom.height,
});
provide('providedDimensions', dimensions);

const numberOfSteps = reactive<Dimensions>({
  width: 3,
  height: 2,
  depth: 2
});

const materialThickness = reactive({
  value: 10
});
provide('providedMaterialThickness', materialThickness);

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
  return usePolygonsForOpenTop(numberOfSteps, stepSizes.value, materialThickness.value);
});
// const polygons = computed(() => {
//   return usePolygons(numberOfSteps, stepSizes.value, materialThickness.value);
// });
provide('providedPolygons', polygons);

const updateVisualSizeModifier = (value) => {
  visualSizeModifier.value = value;
};
const updateThroughHoles = (value) => {
  throughHoles.value = value;
  console.log('throughHoles', throughHoles.value);
};

</script>

<style scoped>

</style>
