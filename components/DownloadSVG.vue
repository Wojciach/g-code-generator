<template>
    <div id='downloadSVG'>
      <button class="btn" @click="handleClick">Download SVG</button>
      <div class="relative">
        <MySVG
          ref="frontAndBackWall"
          :showCircles="false"
          :versionForDownload="true"
          :width="width"
          :height="height"
          :polygonPoints="polygonPoints.frontAndBack"
          :viusaSizeModifier="scale.value"
          :materialThickness="materialThickness"
        />
        <MySVG
          ref="leftAndRighWall"
          :showCircles="false"
          :versionForDownload="true"
          :width="height"
          :height="depth"
          :polygonPoints="polygonPoints.leftAndRight"
          :viusaSizeModifier="scale.value"
          :materialThickness="materialThickness"
        />
        <MySVG
          ref="topWall"
          :showCircles="true"
          :versionForDownload="true"
          :width="width"
          :height="depth"
          :polygonPoints="polygonPoints.topAndBottom"
          :viusaSizeModifier="scale.value"
          :materialThickness="materialThickness"
        />
        <MySVG
          ref="bottomWall"
          :showCircles="throughHoles"
          :versionForDownload="true"
          :width="width"
          :height="depth"
          :polygonPoints="polygonPoints.topAndBottom"
          :viusaSizeModifier="scale.value"
          :materialThickness="materialThickness"
        />
      </div>
    </div>
    
</template>

<script lang="ts" setup>

  const topOfTheBox = ref(null);

  const injectedComputedPolygons: any = inject('providedPolygons');
  const polygonPoints = computed(() => injectedComputedPolygons.value);

  const injectedMaterialThickness: any = inject('providedMaterialThickness');
  const materialThickness = computed(() => injectedMaterialThickness.value);

  const injectedDimensions: any = inject('providedDimensions');
  const {width, height, depth} = injectedDimensions;

  const injectedMatrix: any = inject('providedMatrix');
  const matrix = injectedMatrix;

  const injectedThroughHoles: any = inject('providedThroughHoles');
  const throughHoles = injectedThroughHoles.value;

  // this or scale can be visualScaleModifier passed or injected
  const scale = reactive({
  value: 1
})

  // const widthCalc = computed(() => ((width + (Number(materialThickness) * 2)) * (1)));
  // const heightCalc = computed(() => ((height + (Number(materialThickness) * 2)) * (1)));

    const handleClick = () => {
      console.log('click handled');
      console.log(topOfTheBox.value);
      if(topOfTheBox.value) {
        console.log('click handled');
        const blob = new Blob([topOfTheBox.value.outerHTML], { type: "image/svg+xml" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "topOfTheBox.svg";
        a.click();
        URL.revokeObjectURL(a.href);
      }
  }

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