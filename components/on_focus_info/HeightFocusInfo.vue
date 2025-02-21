<template>
  <div
    :style="{
      width: widthCalc + 'px',
      height: heightCalc + 'px',
      zIndex: 20
    }"
    class="onFocusSpecificInfoClass"
  >
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" :style="{width: '100%', height:'100%'}" preserveAspectRatio="none">
      <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="none" stroke-width="0"/>
      <!-- Arrow shaft -->
      <!-- <line x1="0" y1="0" x2="190" y2="0" stroke="black" stroke-width="4" stroke-dasharray="5,5" />
      <line x1="0" y1="200" x2="190" y2="200" stroke="black" stroke-width="4" stroke-dasharray="5,5" /> -->
      <!-- Walls -->
      <line x1="195" y1="10" x2="195" y2="190" stroke="red" stroke-width="3" />
      <!-- Arrowhead -->
      <polygon class="arrowhead" points="190,20 195,0 200,20" fill="red" transform=""/>
      <polygon class="arrowhead" points="190,180 195,200 200,180" fill="red" transform=""/>
    </svg>
  </div>
</template>

<script lang="ts" setup>

  const props = defineProps<{
    width: number;
    height: number;
    viusaSizeModifier: number;
    materialThickness: number;
  }>();

  //const widthCalc = computed(() => ((props.width + (props.materialThickness * 2)) * (props.viusaSizeModifier as number)));
  const widthCalc = computed(() => ((props.width + (props.materialThickness * 2)) * (props.viusaSizeModifier as number)));
  const heightCalc = computed(() => ((props.height + (props.materialThickness * 2)) * (props.viusaSizeModifier as number)));

  // Define a computed property for the translateX transformation
const translateX = computed(() => {
  // Calculate the translation value as needed
  const translationValue = 250; // Example value, replace with your logic
  return `translateX(${translationValue}px)`;
});

// Define a computed property for the zIndex value
const zIndexValue = computed(() => {
  // Calculate the zIndex value as needed
  const zIndex = 100; // Example value, replace with your logic
  return zIndex;
});

</script>

<style scoped>
/* .onFocusSpecificInfoClass {
  z-index: 1;
} */


</style>