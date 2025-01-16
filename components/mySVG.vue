<template>
  <div>
    <svg ref="theSVG" :viewBox="'0 0 ' + (width + steps.materialThickness * 2) + ' ' + (height + steps.materialThickness * 2)" xmlns="http://www.w3.org/2000/svg" class="border border-gray-600 bg-slate-100">
              <!-- Polygon -->
        <polyline
          :points="polygonPoints" 
          :fill="color" 
          stroke="black" 
          stroke-width="0.03" 
        />  
      <rect 
          :x="steps.materialThickness" 
          :y="steps.materialThickness" 
          :width="width" 
          :height="height" 
          fill="red" 
          stroke="none" 
          stroke-width="0.01" 
        />
        <!-- Circles -->
        <circle
          v-if="showCircles"
          v-for="n in matrix.xyPositions"
          :key="`${n[0]}-${n[1]}`"
          :cx="(n[0] + steps.materialThickness)"
          :cy="(n[1] + steps.materialThickness)" 
          :r="matrix.diameter / 2" 
          fill="black"
          />
      </svg> 
  </div>
</template>

<script lang="ts" setup>

  const props = defineProps<{
    showCircles: boolean;
    matrix: MatrixOfHoles;
    steps: StepsGenerator;
    polygonPoints: string;
    width: number;
    height: number;
    color?: string;
  }>();

  const color = props.color ?? 'none';

</script>

<style>

</style>