<template>
    <div id='downloadDXF'>
      <button class="btn" @click="handleClick">Download DXF</button>
    </div>
    
</template>

<script lang="ts" setup>
import { generateDXF } from '../utils/dxfGenerator';
import type { MatrixOfHoles } from '@/utils/matrixOfHoles'; 

const props = defineProps<{
  matrix: MatrixOfHoles;
}>();


const handleClick = () => {

    const dxfContent = generateDXF(props.matrix);
      
      if(dxfContent) {
        console.log('click handled');
        const element = dxfContent;
        const blob = new Blob([element], { type: "application/dxf" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "output.dxf";
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