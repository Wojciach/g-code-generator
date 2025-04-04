<template>
    <div class="flex flex-col justify-center items-center transparent " id='downloadSVG'>
      <div class="relative flex flex-wrap justify-center items-center p-5 gap-4 transparent ">
        <MySVG
          customID="frontAndBackWall"
          :color="'lightblue'"
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
          :color="'lightblue'"
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
          :color="'lightblue'"
          :showCircles="true"
          :versionForDownload="true"
          :width="width"
          :height="depth"
          :polygonPoints="polygonPoints.top"
          :viusaSizeModifier="scale.value"
          :materialThickness="materialThickness"
        />
        <MySVG
          customID="bottomWall"
          :color="'lightblue'"
          :showCircles="throughHoles"
          :versionForDownload="true"
          :width="width"
          :height="depth"
          :polygonPoints="polygonPoints.bottom"
          :viusaSizeModifier="scale.value"
          :materialThickness="materialThickness"
        />
      </div>
      <div class="flex flex-row flex-wrap justify-center items-center gap-4 transparent mb-4">
        <button class="btn" @click="handleClick">Download SVG</button>
        <DownloadDXF />
        <DownloadG_CODE v-if="false" />
      </div>
    </div>
    
</template>

<script lang="ts" setup>

  const injectedComputedPolygons: any = inject('providedPolygons');
  const polygonPoints = computed(() => injectedComputedPolygons.value);

  const injectedMaterialThickness: any = inject('providedMaterialThickness');
  const materialThickness = computed(() => injectedMaterialThickness.value);

  const injectedDimensions: any = inject('providedDimensions');
  const dims =  injectedDimensions;
  const width = computed(() => dims.width);
  const height = computed(()=>dims.height);
  const depth = computed(() => dims.depth);

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
  @apply px-6 py-3 border-2 border-blue-600 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition;
}

#topWall *, #bottomWall *, #leftAndRighWall *, #frontAndBackWall * {
  stroke-width: 1.2;
}

</style>
