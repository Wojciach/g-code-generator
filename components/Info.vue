<template>
      <div class="flex flex-row space-x-4 items-center">
        <h2>Current dimensions:</h2>

        <div class="dimesionsBox">
          <b>Width:</b>
          <div>Inside: <span class="inline sm:hidden"><br /></span> <b>{{ Number((dimensions.width).toFixed(2)) }}</b></div>
          <div>Outside: <span class="inline sm:hidden"><br /></span> <b>{{ Number(((dimensions.width + computedThicknessModificator.width)).toFixed(2)) }}</b></div>
          (mm)
        </div>
        <div class="dimesionsBox">
          <b>Depth:</b>
          <div>Inside: <span class="inline sm:hidden"><br /></span> <b>{{ Number(((dimensions.depth)).toFixed(2)) }}</b></div>
          <div>Outside: <span class="inline sm:hidden"><br /></span> <b>{{ Number(((dimensions.depth + computedThicknessModificator.depth)).toFixed(2)) }}</b></div>
          (mm)
        </div>
        <div class="dimesionsBox">
          <b>Height:</b>
          <div>Inside: <span class="inline sm:hidden"><br /></span> <b>{{ Number((dimensions.height).toFixed(2)) }}</b></div>
          <div>Outside: <span class="inline sm:hidden"><br /></span> <b>{{ Number(((dimensions.height + computedThicknessModificator.height)).toFixed(2)) }}</b></div>
          (mm)
        </div>

      </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  dimensions: Dimensions;
  materialThickness: number;
  matrixTopAndBottom: MatrixOfHoles;
}>();

const injectedBoxType: any = inject('providedBoxType');
const boxType = injectedBoxType;

const computedThicknessModificator = computed(() => {
  return {
    width: props.materialThickness * 2,
    depth: boxType.value === 'lid' ? props.materialThickness * 5 : props.materialThickness * 2,
    height: boxType.value === 'lid' ? props.materialThickness * 5 : props.materialThickness * 2}
});

const widthInfo = reactive({
  value: typeof window !== 'undefined' ? document.documentElement.clientWidth : 0
});

const updateWidth = () => {
  widthInfo.value = document.documentElement.clientWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth);
});

</script>

<style scoped>
.dimesionsBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid black
}
.dimesionsBox > * {
  padding: 0 5px;
}

</style>