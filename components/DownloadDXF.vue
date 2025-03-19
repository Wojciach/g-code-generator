<template>
    <div id='downloadDXF'>
      <button class="btn" @click="handleClick">Download DXF</button>
    </div>
    
</template>

<script lang="ts" setup>
import type { Coordinates } from '@/utils/types';
import { generateDXF } from '../utils/dxfGenerator';
import type { MatrixOfHoles } from '@/utils/matrixOfHoles'; 

const injectedMatrix = inject('providedMatrix');
const matrix = computed(() => injectedMatrix);

const injectedComputedPolygons: any = inject('providedPolygons');
const polygonPoints = computed(() => injectedComputedPolygons.value);

console.log('polygons', polygonPoints.value.topAndBottom);

const singlePolygonCoordinatesForDXFCreation = (stringPolygon: string) => {
  const array = stringPolygon.trim().split(" ");
  const coordinates = array.map((pair: string) => {
    const [x, y] = pair.split(",").map(Number);
    return { x, y };
  });
  return coordinates;
}

const downloadDXF = (arrayOfCords: Coordinates[], fileName: string) => {

    const dxfContent = generateDXF(arrayOfCords, matrix.value?);
  if (dxfContent) {
    const blob = new Blob([dxfContent], { type: "application/dxf" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
  }
};

const handleClick = () => {
  downloadDXF(singlePolygonCoordinatesForDXFCreation(polygonPoints.value.frontAndBack), 'frontAndBackWall.dxf');
  downloadDXF(singlePolygonCoordinatesForDXFCreation(polygonPoints.value.leftAndRight), 'leftAndRighWall.dxf');
  downloadDXF(singlePolygonCoordinatesForDXFCreation(polygonPoints.value.topAndBottom), 'topWall.dxf');
  downloadDXF(singlePolygonCoordinatesForDXFCreation(polygonPoints.value.topAndBottom), 'bottomWall.dxf');
}

</script>

<style>

.btn {
  @apply px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition;
}

</style>