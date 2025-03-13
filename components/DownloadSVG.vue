<template>
    <div class="bg-red-200" id='downloadSVG'>
      <div class="relative flex flex-wrap justify-center items-center gap-4">
        <MySVG
          customID="frontAndBackWall"
          :showCircles="false"
          :versionForDownload="true"
          :width="width"
          :height="height"
          :polygonPoints="polygonPoints.frontAndBack"
          :viusaSizeModifier="scale.value"
          :materialThickness="materialThickness"
        />
        <MySVG
          customID="leftAndRighWall"
          :showCircles="false"
          :versionForDownload="true"
          :width="height"
          :height="depth"
          :polygonPoints="polygonPoints.leftAndRight"
          :viusaSizeModifier="scale.value"
          :materialThickness="materialThickness"
        />
        <MySVG
          customID="topWall"
          :showCircles="true"
          :versionForDownload="true"
          :width="width"
          :height="depth"
          :polygonPoints="polygonPoints.topAndBottom"
          :viusaSizeModifier="scale.value"
          :materialThickness="materialThickness"
        />
        <MySVG
          customID="bottomWall"
          :showCircles="throughHoles"
          :versionForDownload="true"
          :width="width"
          :height="depth"
          :polygonPoints="polygonPoints.topAndBottom"
          :viusaSizeModifier="scale.value"
          :materialThickness="materialThickness"
        />
      </div>
      <button class="btn" @click="handleClick">Download SVG</button>
    </div>
    
</template>

<script lang="ts" setup>

  const injectedComputedPolygons: any = inject('providedPolygons');
  const polygonPoints = computed(() => injectedComputedPolygons.value);

  const injectedMaterialThickness: any = inject('providedMaterialThickness');
  const materialThickness = computed(() => injectedMaterialThickness.value);

  const injectedDimensions: any = inject('providedDimensions');
  const {width, height, depth} = injectedDimensions;

  // const injectedMatrix: any = inject('providedMatrix');
  // const matrix = injectedMatrix;

  const injectedThroughHoles: any = inject('providedThroughHoles');
  const throughHoles = computed(() => injectedThroughHoles.value);

  // this or scale can be visualScaleModifier passed or injected
  const scale = reactive({
  value: 1
})

  // const widthCalc = computed(() => ((width + (Number(materialThickness) * 2)) * (1)));
  // const heightCalc = computed(() => ((height + (Number(materialThickness) * 2)) * (1)));

  const downloadSVG = (id: string, fileName: string) => {
    const svgElement = document.getElementById(id);
  if (svgElement) {
    const blob = new Blob([svgElement.outerHTML], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  }
};

const handleClick = () => {
  downloadSVG('frontAndBackWall', 'frontAndBackWall.svg');
  downloadSVG('leftAndRighWall', 'leftAndRighWall.svg');
  downloadSVG('topWall', 'topWall.svg');
  downloadSVG('bottomWall', 'bottomWall.svg');
};

</script>

<style>

.btn {
  @apply px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition;
}

</style>


      <!-- <div 
        :style="{
          width: widthCalc + 'px',
          height: heightCalc + 'px'
        }"
      >
        <svg
          v-if="true"
          ref="topOfTheBox"
          :id="'www'"
          :viewBox="'0 0 ' + (width + (materialThickness * 2)) + ' ' + (height + (materialThickness * 2))"
          xmlns="http://www.w3.org/2000/svg"
          class="w-full h-full hidden"
          :style="{ backgroundColor: 'transparent'}"
          preserveAspectRatio="yes"
          >
         Polygon 
            <polyline
              :points="polygonPoints" 
              fill="none" 
              stroke="black" 
              stroke-width="0.12" 
            />  
           Circles 
            <circle
              v-if="(true)"
              v-for="n in matrix.xyPositions"
              :key="`${n[0]}-${n[1]}`"
              :cx="(n[0] + materialThickness)"
              :cy="(n[1] + materialThickness)" 
              :r="matrix.diameter / 2" 
              fill="none"
              stroke="black"
              stroke-width="0.12"
            />
          </svg>
      </div> -->