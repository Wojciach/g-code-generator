<template>
 <StepsNumberWidth class="rotate-90" :rotateLettersBy="(-90)" :skewText="false" :propColor="{steps: wallColors.front, topWall: wallColors.right}" />
</template>

<script lang="ts" setup>
import StepsNumberWidth from './StepsNumberWidth.vue';
import { wallColors } from '@/utils/wallColors';

</script>

<style>

</style>