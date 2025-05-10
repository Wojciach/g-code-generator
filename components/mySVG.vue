<template>
  <div 
    :style="{
      // width: widthCalc + 'px',
      // height: heightCalc + 'px',
      width: (widthCalc * Number(props.viusaSizeModifier)).toFixed(1) + 'px',
      height: (heightCalc * Number(props.viusaSizeModifier)).toFixed(1) + 'px',
    }"
  >
  <!-- :viewBox="-modifyViewBoX + ' ' + -modifyViewBoX + ' ' + (props.width + (Number(props.materialThickness) * 2) + (modifyViewBoX * 2) ) + ' ' + (props.height + (props.materialThickness * 2) + (modifyViewBoX * 2))" -->
  <svg
      @click="applyMask"
      :key="(forceUpdate + 11)"
      :id="customID"
      :viewBox="-modifyViewBoX/2 + ' ' + -modifyViewBoX/2 + ' ' + (widthCalc + modifyViewBoX).toFixed(1) + ' ' + (heightCalc + modifyViewBoX).toFixed(1)"
      xmlns="http://www.w3.org/2000/svg"
      :class="{'w-full h-full': true}"
      :style="{
        backgroundColor: 'none',
        transform: view3D
        ? (customID === 'right_wall_svg' ? 'rotate(180deg)' : 'rotate(0deg)') +
          (customID === 'left_wall_svg' ? ' scaleY(-1)' : ' scaleY(1)')
        : 'rotate(0deg) scaleY(1)',
            }"
      preserveAspectRatio="xMidYMid slice"
    >
    <!-- MAIN RECTANGLE -->
    <rect
        v-if="showThis && (customID === 'top_wall_svg') "
        :x="materialThickness" 
        :y="materialThickness" 
        :width="width" 
        :height="height"
        :fill="view3D ? wallColors.leftButDarker : wallColors.bottom"
      /> 

      <!-- MOCK BOX INSIDE -->
      <rect
        v-if="(view3D === true) && (customID === 'top_wall_svg') && (boxType.value === 'openTop')"
        :x="materialThickness / 2"
        :y="materialThickness"
        :width="width"
        :height="height"
        stroke="black"
        stroke-width="0.4"
        :fill="wallColors.backButDarker"
        transform="skewX(26.4)"
      /> 
      <!-- >>>>>>>> RECTANGLES ON SIDES <<<<<<<<< -->
      <g>
        <!-- TOP Rectangle -->
        <rect
          v-if="showThis"
          :x="materialThickness"
          :y="((customID === 'right_wall_svg') || (customID === 'left_wall_svg') ) ? (thicknessShiftBasedOnBoxType) : 0"
          :width="widthCalc - (materialThickness * 2)"
          :height="materialThickness"
          :fill="topRectColor"
        />
        <!-- RIGHT Rectangle -->
        <rect
            v-if="showThis"
            :x="widthCalc - materialThickness"
            :y="((customID === 'right_wall_svg') || (customID === 'left_wall_svg')) ? thicknessShiftBasedOnBoxType : 0"
            :width="materialThickness"
            :height="height + (materialThickness * 5)"
            :fill="rightRectColor"
        />
        <!-- LEFT Rectangle -->
        <rect
          v-if="showThis"
          :x="0"
          :y="((customID === 'right_wall_svg') || (customID === 'left_wall_svg')) ? thicknessShiftBasedOnBoxType : 0"
          :width="materialThickness"
          :height="height + (materialThickness * 5)"
          :fill="leftRectColor"
        />
        <!-- BOTTOM Rectangle -->
        <rect
          v-if="showThis"
          :x="true? materialThickness : 0"
          :y="heightCalc - materialThickness"
          :width="widthCalc - (materialThickness * 2)"
          :height="materialThickness"
          :fill="bottomRectColor"
        />
      </g>

      <!-- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CORNERS <<<<<<<<<<<<<<<<<<<<< -->
<g>
         
        <!-- LEFT BOTTOM CORNER Rectangle -->
        <rect
   v-if="(showThis && (boxType.value === 'openTop') && (customID === 'top_wall_svg'))"
   :x="0"
   :y="height + materialThickness"
   :width="materialThickness"
   :height="materialThickness"
   :fill="bottomRectColor" 
        />
  
        <!-- RIGHT BOTTOM CORNER Rectangle -->
        <rect
   v-if="(showThis && (boxType.value === 'openTop') && ((customID === 'left_wall_svg') || (customID === 'right_wall_svg')) )"
   :x="width + materialThickness"
   :y="height + materialThickness"
   :width="materialThickness"
   :height="materialThickness"
   :fill="bottomRectColor" 
        />
  
        <!-- LEFT TOP CORNER Rectangle -->
        <rect
   v-if="(showThis && (boxType.value === 'openTop') && (customID === 'right_wall_svg'))"
   :x="0"
   :y="0"
   :width="materialThickness"
   :height="materialThickness"
   :fill="topRectColor" 
        />
  
        <!-- RIGHT TOP CORNER Rectangle -->
        <rect
   v-if="(showThis && (boxType.value === 'openTop') && (customID === 'top_wall_svg'))"
   :x="width + materialThickness"
   :y="0"
   :width="materialThickness"
   :height="materialThickness"
   :fill="topRectColor" 
        />
</g>

    <!-- MAIN RECTANGLE INSIDE STROKE -->
    <rect
        v-if="showThis && (customID === 'top_wall_svg') && (boxType.value === 'openTop')"
        :x="materialThickness" 
        :y="materialThickness"
        :width="width" 
        :height="height"
        fill="none"
        stroke="black"
        stroke-width="0.5"
      /> 

      <!-- Polygon -->
      <polyline
        :points="polygonPoints" 
        :fill="props.color ?? 'none'"
        stroke="black" 
        stroke-width="0.32"
      />
      <!-- Circles -->
      <g>
        <circle
          v-if="showCircles"
          v-for="n in matrix.xyPositions"
          :key="`${n[0]}-${n[1]}`"
          :cx="(n[0] + materialThickness)"
          :cy="((customID === 'top_wall_svg') && (boxType.value === 'lid'))? (n[1] + materialThickness * 3) : (n[1] + materialThickness)"
          :r="matrix.diameter / 2"
          :fill="versionForDownload ? 'white' : 'black'"
          stroke="black"
          stroke-width="0.12"
        />
      </g>
      <!-- HINGE CIRCLE -->
      <circle
        v-if="(boxType.value === 'lid') && ((customID === 'right_wall_svg') || (customID === 'left_wall_svg') || (customID === 'leftAndRighWall'))"
        :cx="(customID === 'right_wall_svg') ? materialThickness * 1.5 : width + materialThickness * 2.5"
        :cy="materialThickness * 1.5"
        :r="Math.sqrt(Math.pow((materialThickness / 2), 2) + Math.pow((materialThickness), 2))" 
        :fill="versionForDownload ? 'white' : 'black'"
        stroke="black"
        stroke-width="0.12"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { wallColors } from '@/utils/wallColors';

  const reff = ref<HTMLElement | null>(null);

  const props = defineProps<{
    showCircles: boolean;
    matrix?: MatrixOfHoles;
    customID?: string;
    view3D?: boolean;
    polygonPoints: string;
    width: number;
    height: number;
    color?: string;
    colorTopRect?: string;
    colorBottomRect?: string;
    colorRightRect?: string;
    colorLeftRect?: string;
    bgColor?: string;
    viusaSizeModifier: number | string;
    materialThickness: number;
    versionForDownload?: boolean;
    reff?: Ref<HTMLElement | null>;
  }>();

  const color = props.color ?? 'none';
  const bgColor = props.bgColor ?? 'none';
  const topRectColor = props.colorTopRect ?? 'purple';
  const bottomRectColor = props.colorBottomRect ?? 'green';
  const rightRectColor = props.colorRightRect ?? 'red';
  const leftRectColor = props.colorLeftRect ?? 'blue';
// const c_id = props.customID ?? 'svg_id';
  const showThis = props.versionForDownload ? false : true;
  const modifyViewBoX = showThis ? 0 : 20;

  const injectedMatrix: any = inject('providedMatrix');
  const matrix = injectedMatrix;

  const injectedBoxType: any = inject('providedBoxType');
  const boxType = injectedBoxType;
  console.log('boxTypeValue!!!!!', boxType.value)
  const forceUpdate = ref(0);

  const thicknessShiftBasedOnBoxType = computed(() => {
    if (boxType.value === 'lid') {
      return props.materialThickness * 3;
    } else {
      return 0;
    }
  });

  const widthCalc = computed(() => (getMaxCoordinates(props.polygonPoints).x));
  const heightCalc = computed(() => (getMaxCoordinates(props.polygonPoints).y));

  watch([boxType, widthCalc, heightCalc], () => {
  setTimeout(applyMask, 0);
  forceUpdate.value++; // Trigger reactivity
});

  function getMaxCoordinates(polygonPoints: string) {
      if (!polygonPoints) {
    return { x: 0, y: 0 }; // Default fallback values
  }
    // Split the string into individual coordinate pairs
    const coordinates = polygonPoints.split(' ');

    // Initialize variables to track the maximum x and y values
    let maxX = -Infinity;
    let maxY = -Infinity;

    // Iterate through each coordinate pair
    for (const coordinate of coordinates) {
      // Split the pair into x and y values
      const [x, y] = coordinate.split(',').map(Number);

      // Update maxX and maxY if the current values are greater
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }

    // Return the result as an object with x and y properties
    return { x: maxX, y: maxY };
  }

  const maskedElement = ref<SVGRectElement | null>(null);
  const applyMask = () => {
  if (((props.customID === 'top_wall_svg') && (boxType.value === 'lid') && (props.view3D === true) && maskedElement.value)) {
    console.log('Applying mask to element:', maskedElement.value);
    maskedElement.value.setAttribute('clip-path', 'url(#myMask)');
  }
};


</script>

<style>

</style>