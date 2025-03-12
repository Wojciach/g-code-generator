<template>
  <div class="w-full h-full flex items-center justify-center">
    <!-- alternative viewBox value in case you want three steps visible on the icon instead of two: 20 100 ${200} ${200} -->
    <svg :viewBox="`20 75 ${200} ${220}`" xmlns="http://www.w3.org/2000/svg" stroke="black" stroke-width="2">
      <rect x="0" y="0" :width="`${size}`" :height="`${size}`" :fill="colors.mainBg" stroke="none" stroke-width="0" />
      <rect x="0" :y="topOfStep" :width="`${size}`" :height="`${size}`" :fill="propColorConst.topWall" stroke="black" stroke-width="5" />
      <!-- Steps -->
      <polygon :points="steps" :fill="propColorConst.steps"  stroke="black" stroke-width="4"/>
      <!-- Text -->
      <text v-for="(step, index) in textXposition"
        :key="index"
        :x="step"
        :y="textY"
        font-family="Arial"
        :font-size="fontSize"
        fill="black"
        text-anchor="middle"
        :class="{
          'skew-text': skewText === true,
          'leftTextPositionAdjustment': (index === 0 && props.skewText === true),
          'centerTextPositionAdjustment': (index === 1 && props.skewText === true),
          'rightTextPositionAdjustment': (index === 2 && props.skewText === true)
        }"
        :transform="`
          rotate(${rotationAngle}, ${textXposition[index]}, ${topOfStep - (fontSize / 2)})
        `"
      >
        {{ index + 1 }}
      </text>
    </svg>
</div>
</template>

<script lang="ts" setup>
import { colors } from '@/utils/colors'
import { wallColors } from '@/utils/wallColors'

const props = defineProps<{
  rotateLettersBy?: number;
  skewText?: boolean;
  propColor?: {steps: string, topWall: string}
}>();

const rotationAngle = props.rotateLettersBy || 0;
const fontSize = 60;
const propColorConst = props.propColor || {steps: wallColors.front, topWall: wallColors.top}

const size = 360;
const stepWidth = size / 6;
const bottomOfStep = size / 100 * 65; // (100*65 is for  percentage representation) 65% of the size
const topOfStep = size / 100 * 50; // (100*50 is for  percentage representation) 50% of the size
const stepsArray = Array.from({length: 6}, (_, i) => (i * stepWidth) + (stepWidth / 2));
const textY = topOfStep - 10;
const textXpositionPrep: number[] = [stepsArray[0], stepsArray[2], stepsArray[4]];
const textXposition: number[] = textXpositionPrep.map((x, i) => x + (stepWidth / 2));

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
  .skew-text {
    transform-origin: center center; /* Change the transform origin to the center */
  }
  .leftTextPositionAdjustment {
    transform: translate(15%, 65%) scale(1.5) skewY(55deg);
  }
  .centerTextPositionAdjustment {
    transform: translate(-5%, -7%) scale(1.5) skewY(55deg);
  }
  .rightTextPositionAdjustment {
    transform: translate(-20%, -80%) scale(1.5) skewY(55deg);
  }
</style>