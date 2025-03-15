<template>
  <div 
    :style="{
      // width: widthCalc + 'px',
      // height: heightCalc + 'px',
      width: widthCalc + 'px',
      height: heightCalc + 'px',
    }"
  >
  <!-- :viewBox="'0 0 ' + (width + (steps.materialThickness * 2)) + ' ' + (height + (steps.materialThickness * 2))" -->
    <svg
      :id="customID"
      :viewBox="'0 0 ' + (width + (materialThickness * 2)) + ' ' + (height + (materialThickness * 2))"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full h-full"
      :style="{ backgroundColor: bgColor}"
      preserveAspectRatio="xMidYMid slice"
    >
    <!-- MAIN RECTANGLE -->
    <rect
        v-if="showThis"
        :x="materialThickness" 
        :y="materialThickness" 
        :width="width" 
        :height="height"
        fill="none" 
        stroke="red"
        stroke-width="0.02" 
      />

      <!-- TOP Rectangle -->
      <rect
          v-if="showThis"
          :x="materialThickness" 
          :y="0" 
          :width="width" 
          :height="materialThickness" 
          :fill="topRectColor" 
          stroke="black" 
          stroke-width="0.12" 
      />
      <!-- BOTTOM Rectangle -->
      <rect
          v-if="showThis"
          :x="materialThickness" 
          :y="height + materialThickness" 
          :width="width" 
          :height="materialThickness" 
          :fill="bottomRectColor" 
          stroke="black" 
          stroke-width="0.12" 
      />
      <!-- RIGHT Rectangle -->
      <rect
          v-if="showThis"
          :x="width + materialThickness" 
          :y="0" 
          :width="materialThickness" 
          :height="height + (materialThickness * 2)" 
          :fill="rightRectColor" 
          stroke="black" 
          stroke-width="0.12" 
      />
      <!-- LEFT Rectangle -->
      <rect
          v-if="showThis"
          :x="0" 
          :y="0" 
          :width="materialThickness" 
          :height="height + (materialThickness * 2)" 
          :fill="leftRectColor" 
          stroke="black" 
          stroke-width="0.12" 
      />
      <!-- Polygon -->
      <polyline
        :points="polygonPoints" 
        :fill="color" 
        stroke="black" 
        stroke-width="0.12" 
      />  
      <!-- Circles -->
      <circle
        v-if="(showCircles)"
        v-for="n in matrix.xyPositions"
        :key="`${n[0]}-${n[1]}`"
        :cx="(n[0] + materialThickness)"
        :cy="(n[1] + materialThickness)" 
        :r="matrix.diameter / 2" 
        :fill="versionForDownload ? 'none' : 'black'"
        stroke="black"
        stroke-width="0.12"
      />

    </svg>
  </div>
</template>

<script lang="ts" setup>

  const reff = ref<HTMLElement | null>(null);

  const props = defineProps<{
    showCircles: boolean;
    matrix?: MatrixOfHoles;
    customID?: string;
    polygonPoints: string;
    width: number;
    height: number;
    color?: string;
    colorTopRect?: string;
    colorBottomRect?: string;
    colorRightRect?: string;
    colorLeftRect?: string;
    bgColor?: string;
    viusaSizeModifier: number | string;
    materialThickness: number;
    versionForDownload?: boolean;
    reff?: Ref<HTMLElement | null>;
  }>();

  const color = props.color ?? 'none';
  const bgColor = props.bgColor ?? 'none';
  const topRectColor = props.colorTopRect ?? 'purple';
  const bottomRectColor = props.colorBottomRect ?? 'green';
  const rightRectColor = props.colorRightRect ?? 'red';
  const leftRectColor = props.colorLeftRect ?? 'blue';
// const c_id = props.customID ?? 'svg_id';
  const showThis = props.versionForDownload ? false : true;

  const injectedMatrix: any = inject('providedMatrix');
  const matrix = injectedMatrix;

  const widthCalc = computed(() => ((props.width + (props.materialThickness * 2)) * (props.viusaSizeModifier as number)));
  const heightCalc = computed(() => ((props.height + (props.materialThickness * 2)) * (props.viusaSizeModifier as number)));

</script>

<style>

</style>