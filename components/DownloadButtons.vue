<template>
      <div class="">
        <DownloadSVG />
        <DownloadDXF :matrix="matrixTopAndBottom" />
        <DownloadG_CODE :matrix="matrixTopAndBottom" />
        <div 
    :style="{
      width: widthCalc + 'px',
      height: heightCalc + 'px'
    }"
  >

  </div>
      </div>
</template>

<script lang="ts" setup>

</script>

<style>
.btn {
  @apply px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition;
}

</style>