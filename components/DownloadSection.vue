<template>
  <div class="flex flex-row flex-wrap justify-center items-center gap-4 blue-200">
    <DownloadSVG />
    <DownloadG_CODE v-if="false" :matrix="matrixTopAndBottom" />
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.btn {
  @apply px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-red-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition;
}

</style>