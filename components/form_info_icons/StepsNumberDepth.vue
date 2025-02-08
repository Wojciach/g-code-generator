<template>
 <StepsNumberWidth class="x" :skewText="true" :rotateLettersBy="(-90)" />
</template>

<script lang="ts" setup>
import StepsNumberWidth from './StepsNumberWidth.vue';

</script>

<style>
.x {
  transform: skew(0deg, -35deg) scaleY(0.4);
}

/* .x text {
  transform: skew(0deg, 35deg) scaleY(2.5);
} */

</style>