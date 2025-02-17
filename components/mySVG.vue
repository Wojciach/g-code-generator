<template>
  <div 
    :style="{
      width: widthCalc + 'px',
      height: heightCalc + 'px'
    }"
  >
  <!-- :viewBox="'0 0 ' + (width + (steps.materialThickness * 2)) + ' ' + (height + (steps.materialThickness * 2))" -->
    <svg
      ref="theSVG"
      :viewBox="'0 0 ' + (width + (materialThickness * 2)) + ' ' + (height + (materialThickness * 2))"
      xmlns="http://www.w3.org/2000/svg"
      class="border border-gray-600 bg-slate-100 w-full h-full"
      :style="{ backgroundColor: bgColor}"
      preserveAspectRatio="none"
    >
      <!-- Main Rectangle -->
      <rect 
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
          :x="materialThickness" 
          :y="0" 
          :width="width" 
          :height="materialThickness" 
          :fill="topRectColor" 
          stroke="none" 
          stroke-width="0.02" 
      />
      <!-- BOTTOM Rectangle -->
      <rect 
          :x="materialThickness" 
          :y="height + materialThickness" 
          :width="width" 
          :height="materialThickness" 
          :fill="bottomRectColor" 
          stroke="none" 
          stroke-width="0.02" 
      />
      <!-- RIGHT Rectangle -->
      <rect 
          :x="width + materialThickness" 
          :y="0" 
          :width="materialThickness" 
          :height="height + (materialThickness * 2)" 
          :fill="rightRectColor" 
          stroke="none" 
          stroke-width="0.02" 
      />
      <!-- LEFT Rectangle -->
      <rect 
          :x="0" 
          :y="0" 
          :width="materialThickness" 
          :height="height + (materialThickness * 2)" 
          :fill="leftRectColor" 
          stroke="none" 
          stroke-width="0.02" 
      />
      <!-- Polygon -->
      <polyline
        :points="polygonPoints" 
        :fill="color" 
        stroke="black" 
        stroke-width="0.02" 
      />  
      <!-- Circles -->
      <circle
        v-if="(showCircles && matrix)"
        v-for="n in matrix.xyPositions"
        :key="`${n[0]}-${n[1]}`"
        :cx="(n[0] + materialThickness)"
        :cy="(n[1] + materialThickness)" 
        :r="matrix.diameter / 2" 
        fill="black"
      />
    </svg> 
  </div>
</template>

<script lang="ts" setup>

  const props = defineProps<{
    showCircles: boolean;
    matrix?: MatrixOfHoles;
    //steps: StepsGenerator; //TODO: remove
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
  }>();

  const color = props.color ?? 'none';
  const bgColor = props.bgColor ?? 'none';
  const topRectColor = props.colorTopRect ?? 'purple';
  const bottomRectColor = props.colorBottomRect ?? 'green';
  const rightRectColor = props.colorRightRect ?? 'red';
  const leftRectColor = props.colorLeftRect ?? 'blue';

  const widthCalc = computed(() => ((props.width + (props.materialThickness * 2)) * (props.viusaSizeModifier as number)));
  const heightCalc = computed(() => ((props.height + (props.materialThickness * 2)) * (props.viusaSizeModifier as number)));

</script>

<style>

</style>