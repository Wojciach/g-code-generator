<template>
    <div class="absolute z-50 flex flex-row h-8 w-fit-content w-32 items-center top-0 left-0 bg-blue-500 ">
      <button @click="decrease" class="buttonClass h-full">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <rect x="5" y="5" width="90" height="90" :fill="bgColor" rx="17" ry="17" stroke-width="8" :stroke="signColor"/>
          <line x1="25" y1="50" x2="75" y2="50" :stroke="signColor" stroke-width="9" stroke-linecap="round" />
        </svg>
      </button>
      <input
        :value="scale.value"
        @input="$emit('update:scale', Number($event.target.value))"
        type="number"
        min="0.1"
        step="0.1"
        class="w-10 h-full mx-0.5 p-2 border border-gray-300 rounded-md text-center"
        required
      />
      <button @click="increase" class="buttonClass h-full">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <rect x="5" y="5" width="90" height="90" :fill="bgColor" rx="17" ry="17" stroke-width="8" :stroke="signColor"/>
          <line x1="25" y1="50" x2="75" y2="50" :stroke="signColor" stroke-width="9" stroke-linecap="round" />
          <line x1="50" y1="25" x2="50" y2="75" :stroke="signColor" stroke-width="9" stroke-linecap="round" />
        </svg>
      </button>
    </div>
</template>

<script lang="ts" setup>

const bgColor = 'white';
const signColor = 'oklch(0.809 0.105 251.813)';

const emit = defineEmits(['update:scale']);

const scale = reactive({
  value: Number(1)
});

const decrease = () => {
  let number = Number(scale.value);
  let newValue = Math.round((number - 0.1) * 10) / 10;
  if (scale.value> 0.1) {
    scale.value = newValue;
    emit('update:scale', newValue);
  }
};
const increase = () => {
  let number = Number(scale.value);
  let newValue = Math.round((number + 0.1) * 10) / 10;
  scale.value = newValue;
    emit('update:scale', newValue);
};

</script>

<style>

/* Hide the default arrows in input type number */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}


</style>