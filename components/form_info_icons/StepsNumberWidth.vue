<template>
  <div class="w-full h-full flex items-center justify-center">
    <svg :viewBox="`0 0 ${size} ${size}`" xmlns="http://www.w3.org/2000/svg">

      <rect x="0" y="0" :width="`${size}`" :height="`${size}`" fill="tomato" stroke="none" stroke-width="0" />

      <!-- Steps -->
      <polygon :points="steps" fill="red"  stroke="black" stroke-width="4"/>

      <!-- Text -->
      <text v-for="(step, index) in textXposition"
        :key="index" :x="step"
        :y="textY"
        font-family="Arial"
        :font-size="fontSize"
        fill="black"
        text-anchor="middle"
        :transform="`rotate(${rotationAngle}, ${textXposition[index]}, ${topOfStep - (fontSize / 2)})`"
      >
        {{ index + 1 }}
      </text>
    </svg>
</div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  rotateLettersBy: number;
}>();

const rotationAngle = props.rotateLettersBy;
const letterRotationXposition = 0;
const letterRotationYposition = 0;

const fontSize = 44;

const size = 360;
const stepWidth = size / 6;
const bottomOfStep = size / 100 * 65;
const topOfStep = size / 100 * 50;
const stepsArray = Array.from({length: 6}, (_, i) => (i * stepWidth) + (stepWidth / 2));
const textY = topOfStep - 10;
const textXposition = [stepsArray[0] + stepWidth / 2, stepsArray[2] + stepWidth / 2, stepsArray[4] + stepWidth / 2];

const steps = `
  0,${size}
  0,${bottomOfStep}
  ${stepsArray[0]},${bottomOfStep}
  ${stepsArray[0]},${topOfStep}
  ${stepsArray[1]},${topOfStep}
  ${stepsArray[1]},${bottomOfStep}
  ${stepsArray[2]},${bottomOfStep}
  ${stepsArray[2]},${topOfStep}
  ${stepsArray[3]},${topOfStep}
  ${stepsArray[3]},${bottomOfStep}
  ${stepsArray[4]},${bottomOfStep}
  ${stepsArray[4]},${topOfStep}
  ${stepsArray[5]},${topOfStep}
  ${stepsArray[5]},${bottomOfStep}
  ${size},${bottomOfStep}
  ${size},${size}
`;

</script>

<style scoped>
</style>