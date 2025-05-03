<template>
  <div class="relative w-full flex flex-row flex-wrap justify-center items-center">
    <div class="absolute flex flex-row -top-20 left-0 z-50">
      <button @click="fitToWindow" class="buttonClass bg-gray-600"> fit </button>
      <button @click="plusSize" class="buttonClass bg-red-600 mx-2"> +  </button>
      <button @click="minusSize" class="buttonClass bg-blue-600"> -  </button>
    </div>
    <label for="visualSizeModifier" class="w-fit-content mr-2">Scale: {{ Math.round(Number(injectedVisualSizeModifier.value) * 50)}}</label>
    <input
      class="flex-grow"
      id="visualSizeModifier"
      ref="visualSizeInput"
      type="range"
      :value="injectedVisualSizeModifier.value"
      @change="updateValue"
      :min="0.1"
      :max="3"
      :step="0.1"
    />
  </div>
</template>
<!-- @input="onInput" @change="$emit('update:visualSizeModifier', Number($event.target.value))" -->
<script lang="ts" setup>
// import { useGlobalState } from '~/utils/composables/useGlobalState';
// const global = reactive(useGlobalState());
const props = defineProps<{
  visualSizeModifier: number,
  visualisationDisplaySection: any,
  formSection: any,
  visualisationSizeContoler: any,
  intercheangeableVisualisation: any,
  appWindow: any
}>()

const updateValue = (event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value;
  injectedVisualSizeModifier.value = Number(inputValue);
  console.log('Input value:', inputValue);
}

const visualSizeInput = ref<HTMLInputElement | null>(null);

const injectedDimensions: any = inject('providedDimensions');
const dimensions = computed(() => injectedDimensions);

const injectedVisualSizeModifier: any = inject('providedVisualSizeModifier');
const visualSizeModifier = computed(() => injectedVisualSizeModifier);
watch(visualSizeModifier.value, (value) => {
  console.log('visualSizeModifier from Visialsize modifier component: ', value);
})
  

const injectedFormType: any = inject('providedFormType');
const formType = computed(() => injectedFormType);

function automaticResize() {
  console.log('automaticResize called');

  const formSectionWidth: number = (window.innerWidth >= window.innerHeight)? props.formSection.getBoundingClientRect().width : 0;
  const visualisationDisplaySection: number = props.visualisationDisplaySection.getBoundingClientRect().width;
  const currentWindow: {width: number, height: number} = {width: window.innerWidth, height: window.innerHeight};

  const visualisationSizeContoler = props.visualisationSizeContoler.getBoundingClientRect();
  const visualisationSizeContolerPriority = Math.max(visualisationSizeContoler.width, visualisationSizeContoler.height);
  const sizeControlerWidthOrHeight: 'width' | 'height' = visualisationSizeContolerPriority === visualisationSizeContoler.width ? 'width' : 'height';
  const isFormNeeded: boolean = ((sizeControlerWidthOrHeight === 'height') || (formType.value.value === 'alternativeForm') ? false : true);
  const potetnialFormSubtraction = isFormNeeded ? formSectionWidth : 0;

  const appWindow = props.appWindow.getBoundingClientRect();
  const appWindowPriority = Math.max(appWindow.width, appWindow.height);
  const appWidthOrHeight: 'width' | 'height' = visualisationSizeContolerPriority === visualisationSizeContoler.width ? 'width' : 'height';

  const intercheangeableVisualisation = props.intercheangeableVisualisation.getBoundingClientRect();

  const windowPriotity = ((window.innerWidth - potetnialFormSubtraction) >= window.innerHeight) ? window.innerWidth : window.innerHeight;
  const windowPriotityWidthOrHeight: string = windowPriotity === window.innerWidth ? 'width' : 'height';
  console.log('THW WINDOW IS: ' + ((windowPriotityWidthOrHeight === 'width')? 'HORIZONTAL' : 'VERTICAL'));

  //neet to change this condition
  // console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
  // console.log('SIZE CONTROLER PRIORITY: ' + sizeControlerWidthOrHeight)
  // console.log('SIZE CONTROLER SIZE: ' + visualisationSizeContoler[sizeControlerWidthOrHeight])
  // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
  // console.log('WINDOW PRIORIT: ' + sizeControlerWidthOrHeight)
  // console.log('WINDOW PRIORITY SIZE: ' + currentWindow[sizeControlerWidthOrHeight])
  // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^')
  // console.log('POTENTIAL FORM SUBTRACTION: ' + potetnialFormSubtraction)
  // console.log('FORM WIDTH: ' + formSectionWidth)
  // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
  if ((visualisationSizeContoler[sizeControlerWidthOrHeight] * 1.5) < (currentWindow[sizeControlerWidthOrHeight] - potetnialFormSubtraction)) {
    // visualisationSizeContoler[windowPriotityWidthOrHeight] + 100 <= windowPriotity
    // console.log('visualisation size contorler: ' + visualisationSizeContoler[sizeControlerWidthOrHeight])
    // console.log('THE SUM: ' + (currentWindow[sizeControlerWidthOrHeight] - formSectionWidth))
    // console.log('FORM WIDTH: ' + (formSectionWidth))
    // console.log('condition for UPSIZE met');
    const continueTheLoop = automaticUpsize();
    if (continueTheLoop) {
      console.log('continue the loop');
      setTimeout(() => { automaticResize(); }, 0);
    } else {
      console.log('stop upsizing loop');
    }
  } else if ((visualisationSizeContoler[sizeControlerWidthOrHeight]) >= ((currentWindow[sizeControlerWidthOrHeight] - potetnialFormSubtraction))) {
    //visualisationSizeContoler[windowPriotityWidthOrHeight] - 100 >= windowPriotity
    console.log('condition for DOWNSIZE met');
    const continueTheLoop = automaticDownsize();
    if (continueTheLoop) {
      console.log('continue the loop');
      setTimeout(() => { automaticResize(); }, 0);
    } else {
      console.log('stop downsizing loop');
    }
  } else {
    console.log('No resizing needed. Exiting...');
    console.log('____________________________________');
    console.log('------------------------------------');
  }
}

function automaticDownsize() {
  console.log('automaticDownsize called');
  // Exit condition: Prevent going below minimum size
  if (injectedVisualSizeModifier.value <= 0.2) {
    console.log('Reached minimum size. Stopping downsizing.');
    injectedVisualSizeModifier.value = 0.1; // Clamp to minimum value
    return false; // Stop the recursion
  } else {
    console.log('Downsizing...');
    injectedVisualSizeModifier.value -= 0.1;
    return true; // Continue the recursion
  }
}

const automaticUpsize = () => {
  console.log('automaticUpsize called');
  // Exit condition: Prevent exceeding maximum size
  if (injectedVisualSizeModifier.value >= 3) {
    console.log('Reached maximum size. Stopping upsizing.');
    injectedVisualSizeModifier.value = 3; // Clamp to maximum value
    return false; // Stop the recursion
  } else {
    console.log('Upsizing...');
    injectedVisualSizeModifier.value += 0.1;
    return true; // Continue the recursion
  }
};

const fitToWindow = () => {
  automaticResize();
};

const plusSize = () => {
  if (injectedVisualSizeModifier.value >= 3) {
    console.log('Reached maximum size. Stopping upsizing.');
    injectedVisualSizeModifier.value = 3; // Clamp to maximum value
    return; // Stop the recursion
  }
  injectedVisualSizeModifier.value += 0.1;
  console.log(injectedVisualSizeModifier);
};

const minusSize = () => {
  if (injectedVisualSizeModifier.value <= 0.2) {
    console.log('Reached minimum size. Stopping downsizing.');
    injectedVisualSizeModifier.value = 0.1; // Clamp to minimum value
    return; // Stop the recursion
  }
  injectedVisualSizeModifier.value -= 0.1;
  console.log(injectedVisualSizeModifier);
};

</script>

<style scoped>
.buttonClass {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border-color: hsl(0, 0%, 850%);
  border-width: 2px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  /*transition: background-color 0.3s ease, transform 0.3s ease; */
  @apply relative size-16;
}

.buttonClass:hover {
  box-shadow: 0 0 10px 2px hsl(0, 0%, 100%);
  border-color: hsl(0, 0%, 80%);
}

</style>