<template>
    <div id='downloadDXF'>
      <button class="btn" @click="handleClick">Download DXF</button>
    </div>
    
</template>

<script lang="ts" setup>
import type { Coordinates } from '@/utils/types';
import { generateDXF } from '../utils/dxfGenerator';
import { MatrixOfHoles } from '@/utils/matrixOfHoles'; 

const injectedMatrix = inject('providedMatrix');
const matrix = computed(() => injectedMatrix);

const injectedThroughHoles = inject('providedThroughHoles');
const throughHoles = computed(() => injectedThroughHoles);

const injectedMaterialThickness = inject('providedMaterialThickness');
const materialThickness = computed(() => injectedMaterialThickness);

const injectedComputedPolygons: any = inject('providedPolygons');
const polygonPoints = computed(() => injectedComputedPolygons.value);

console.log('polygons', polygonPoints.value.topAndBottom);

const singlePolygonCoordinatesForDXFCreation = (stringPolygon: string) => {
  const array = stringPolygon.trim().split(" ");
  const coordinates = array.map((pair) => {
    const [x, y] = pair.split(",").map(Number);
    return { x, y };
  });
  return coordinates;
}

const downloadDXF = (arrayOfCords: Coordinates[], fileName: string, throughHoles: boolean) => {
    console.log(materialThickness.value.value)
    var dxfContent;
    if (throughHoles) {
       dxfContent = generateDXF(arrayOfCords, materialThickness.value.value as number, matrix.value as MatrixOfHoles);
    } else {
      dxfContent = generateDXF(arrayOfCords, materialThickness.value.value as number);
    }
    
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
  downloadDXF(singlePolygonCoordinatesForDXFCreation(polygonPoints.value.frontAndBack), 'frontAndBackWall.dxf', false);
  downloadDXF(singlePolygonCoordinatesForDXFCreation(polygonPoints.value.leftAndRight), 'leftAndRighWall.dxf', false);
  downloadDXF(singlePolygonCoordinatesForDXFCreation(polygonPoints.value.topAndBottom), 'topWall.dxf', true);
  downloadDXF(singlePolygonCoordinatesForDXFCreation(polygonPoints.value.topAndBottom), 'bottomWall.dxf', throughHoles.value.value);
}

</script>

<style>

.btn {
  @apply px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition;
}

</style>