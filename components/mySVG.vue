<template>
  <div>
    <svg ref="theSVG" :viewBox="'0 0 ' + (matrix.width + steps.materialThickness * 2) + ' ' + (heightInZ + steps.materialThickness * 2)" xmlns="http://www.w3.org/2000/svg" class="border border-gray-600 bg-slate-100">
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
          :width="(matrix.width)" 
          :height="heightInZ" 
          fill="none" 
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
    heightInZ?: number;
    color?: string;
  }>();

  const heightInZ = props.heightInZ ?? props.matrix.height;
  const color = props.color ?? 'none';

</script>

<style>

</style>