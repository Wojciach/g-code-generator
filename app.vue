<template>
  <main ref="appWindow" class="flex flex-col justify-center h-full w-full bg-red-500 min-w-min" :style="{backgroundColor: colors.mainBg}">
    <article ref="info" class="flex justify-center p-4 w-full">
      <Info
        :materialThickness="materialThickness.value"
        :dimensions="dimensions"
        :formWidth="formWidth"
        :matrixTopAndBottom="matrixTopAndBottom"
      />
    </article>
    <article class="flex landscape:flex-row portrait:flex-col-reverse justify-center h-fit-content w-fit-content">
      <section ref="formSection" class="flex landscape:w-fit-content justify-center">
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
      <section ref="visualisationDisplaySection" class="flex flex-col justify-center items-center flex-grow w-full">
          <div ref="intercheangeableVisualisation" class="relative flex flex-grow flex-col justify-center items-center h-full w-full min-h-[600px]">
            <div ref="visualisationSizeContoler" class="relative flex w-fit h-fit">
              <NewVisualisation3d
                v-show="selectedView === '3D'"
                class="z-20 flex m-0"
                :matrix="matrixTopAndBottom"
                :numberOfSteps="numberOfSteps"
                :materialThickness="materialThickness.value"
                :dimensions="dimensions"
                :polygons="{top: polygons.top, front: polygons.front, right: polygons.right, left: polygons.left}"
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
                :polygons="{top: polygons.top, bottom: polygons.bottom, front: polygons.front, back: polygons.back, left: polygons.left, right: polygons.right}"
                :materialThickness="materialThickness.value"
                :visualSizeModifier="visualSizeModifier.value"
                :throughHoles="throughHoles.value"
              />
              <DownloadSVG class="z-20" v-show="selectedView === 'Download'" />
            </div>
              <Grid :gridFactor="gridFactor" class="bg-red-900 z-10"/>
          </div>
          <div class="p-2 pb-4 flex flex-col w-full  justify-center items-center bg-gray-300">
            <VisualSizeModifier
              class="flex flex-row flex-wrap justify-center items-center bg-gray-200 p-2 px-4 rounded-2xl"
              @update:visualSizeModifier="updateVisualSizeModifier"
              :visualSizeModifier="visualSizeModifier.value"
              :visualisationDisplaySection="visualisationDisplaySection"
              :formSection="formSection"
              :intercheangeableVisualisation="intercheangeableVisualisation"
              :visualisationSizeContoler="visualisationSizeContoler"
              :appWindow="appWindow"
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
import { usePolygonsLid } from '@/utils/composables/usePolygonsLid';
import VisualSizeModifier from './components/buttonSets/VisualSizeModifier.vue';
import SelectViewButtons from './components/buttonSets/SelectViewButtons.vue';
//import DownloadSection from './components/DownloadSection.vue';

const visualisationDisplaySection = ref(null);
const formSection = ref(null);
const intercheangeableVisualisation = ref(null);
const visualisationSizeContoler = ref(null);
const appWindow = ref(null);

const selectedView = ref('3D')

const formType = reactive({value: 'TheForm'});
provide('providedFormType', formType);

const changeFormType = (type: string) => {
  formType.value = type;
};
provide('changeFormType', changeFormType);

const info = ref(null);
const formWidth = ref(0);
const myNumber = ref(true);

const matrixTopAndBottom = reactive(new MatrixOfHoles(8, 5, 10, 10, 10, 10, 10));
provide('providedMatrix', matrixTopAndBottom);

const visualSizeModifier = reactive({
  value: 1
});
provide('providedVisualSizeModifier', visualSizeModifier);
watch (() => visualSizeModifier.value, (value) => {
  console.log('visualSizeModifier from main app', value);
});

const throughHoles = reactive({
  value: false
});
provide('providedThroughHoles', throughHoles);

const gridFactor = computed(() => {
  return visualSizeModifier.value * 50;
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

const boxType = reactive({
  value: 'lid'
});
provide('providedBoxType', boxType);

const polygons = computed(() => {
  switch (boxType.value) {
    case 'openTop':
      return usePolygonsForOpenTop(numberOfSteps, stepSizes.value, materialThickness.value);
    case 'holes':
      return usePolygons(numberOfSteps, stepSizes.value, materialThickness.value);
    case 'lid':
      return usePolygonsLid(numberOfSteps, stepSizes.value, materialThickness.value);
    default:
      return usePolygons(numberOfSteps, stepSizes.value, materialThickness.value);
  }
});
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
