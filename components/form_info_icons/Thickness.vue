<template>
  <div class="w-full">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect x="0" y="0" width="200" height="200" fill="tomato" />

      <g class="wholeGroup" transform="scale(1, 0.9)">
        <!-- Material representation -->
        <rect x="0" y="25" width="75" height="150" fill="red" stroke="red" stroke-width="22" />
        
        <!-- Dashed Lines -->
        <!-- TOP -->
        <line x1="80" y1="25" x2="170" y2="25" stroke="black" stroke-width="12" stroke-dasharray="16,16" />
        <!-- BOTTOM -->
        <line x1="80" y1="175" x2="170" y2="175" stroke="black" stroke-width="12" stroke-dasharray="16,16" />
        <!-- Arrow -->
        <g class="arrow" transform="translate(-15,0) scale(0.8)">
          <!-- Arrowheads -->
          <polygon points="150,60 200,0 250,60" fill="black" />
          <polygon points="150,140 250,140 200,200" fill="black" />
          <!-- Arrow shaft -->
          <line x1="200" y1="50" x2="200" y2="150" stroke="black" stroke-width="40" />
        </g>
      </g>

    </svg>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
  .arrow {
    transform-origin: center;
  }

  .wholeGroup {
    transform-origin: center;
  }
</style>