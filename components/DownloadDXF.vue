<template>
    <div id='downloadDXF'>
      <button class="btn" @click="handleClick">Download DXF</button>
    </div>
    
</template>

<script lang="ts" setup>
import type { Coordinates, HingeHoleCoordsDXF } from '@/utils/types';
import { generateDXF } from '../utils/dxfGenerator';
import { MatrixOfHoles } from '@/utils/matrixOfHoles';

const injectedBoxType: any = inject('providedBoxType');
const boxTypeValue = computed(() => injectedBoxType.value);

const injectedMatrix = inject('providedMatrix');
const matrix = computed(() => injectedMatrix);

const injectedThroughHoles = inject('providedThroughHoles');
const throughHoles = computed(() => injectedThroughHoles);

const injectedMaterialThickness = inject<Ref<number>>('providedMaterialThickness');
const materialThickness = computed(() => injectedMaterialThickness);

const injectedComputedPolygons: any = inject('providedPolygons');
const polygonPoints = computed(() => injectedComputedPolygons.value);

const injectedDimensions: any = inject('providedDimensions');
const dimensions = computed(() => injectedDimensions);

const singlePolygonCoordinatesForDXFCreation = (stringPolygon: string, Yshift?: number) => {
  const array = stringPolygon.trim().split(" ");
  const coordinates = array.map((pair) => {
    let [x, y] = pair.split(",").map(Number);
    y -= Yshift ? Yshift : 0;
    return { x, y };
  });
  return coordinates;
}

const downloadDXF = (arrayOfCords: Coordinates[], fileName: string, throughHoles: boolean, hinge?: HingeHoleCoordsDXF) => {
    var dxfContent;
    if (throughHoles) {
      dxfContent = generateDXF(arrayOfCords, materialThickness.value.value as number, matrix.value as MatrixOfHoles);
    } else if (hinge) {
      dxfContent = generateDXF(arrayOfCords, materialThickness.value.value as number, undefined, hinge);
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

  // olny for box type 'lid' left and right wall are different and also front and back wall are different (from each other)
  if (boxTypeValue.value === 'lid') {
    downloadDXF(singlePolygonCoordinatesForDXFCreation(polygonPoints.value.front), 'frontWall.dxf', false);
    downloadDXF(singlePolygonCoordinatesForDXFCreation(polygonPoints.value.back), 'backWall.dxf', false);

    const matThick = Number(materialThickness.value.value) as number;
    const rad = Math.sqrt(Math.pow((matThick / 2), 2) + Math.pow((matThick), 2))
    console.log(rad);

    let leftHinge: HingeHoleCoordsDXF = {
      x: (dimensions.value.height + (matThick * 2.5)),
      y: (matThick * 2.5),
      radius: rad
    };
    downloadDXF(singlePolygonCoordinatesForDXFCreation(polygonPoints.value.left), 'leftWall.dxf', false, leftHinge);

    let rightHinge: HingeHoleCoordsDXF = {
      x: (matThick * 2.5),
      y: (matThick * 2.5), 
      radius: rad
    };
    downloadDXF(singlePolygonCoordinatesForDXFCreation(polygonPoints.value.right), 'rightWall.dxf', false, rightHinge);

  } else {
    downloadDXF(singlePolygonCoordinatesForDXFCreation(polygonPoints.value.left), 'leftAndRighWall.dxf', false);
    downloadDXF(singlePolygonCoordinatesForDXFCreation(polygonPoints.value.front), 'frontAndBackWall.dxf', false);
  }

  // top wal does not exist for box type 'openTop'
  if (boxTypeValue.value !== 'openTop') {
    const shift = (boxTypeValue.value === 'lid') ? (materialThickness.value.value * 2) : 0;
    downloadDXF(singlePolygonCoordinatesForDXFCreation(polygonPoints.value.top, shift), 'topWall.dxf', true);
  }
  downloadDXF(singlePolygonCoordinatesForDXFCreation(polygonPoints.value.bottom), 'bottomWall.dxf', throughHoles.value.value);
}

</script>

<style>

.btn {
  @apply px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition;
}

</style>