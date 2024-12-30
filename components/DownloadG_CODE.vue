<template>
    <div id='downloadG_CODE'>
      <button class="btn" @click="handleClick">Download G-CODE</button>
    </div>
    
</template>

<script lang="ts" setup>
import '../utils/G_CODE_Generator';
import { MatrixOfHoles } from '../utils/matrixOfHoles';

const props = defineProps<{
  matrix: MatrixOfHoles;
}>();


const handleClick = () => {

    const gCodeGenerator = new G_CODE_Generator(props.matrix, 100, 100);
    const gCode = gCodeGenerator.generateFullG_CODE();
      
      
      if(gCode) {
        console.log('click handled');
        const element = gCode;
        const blob = new Blob([element], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "output.nc";
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