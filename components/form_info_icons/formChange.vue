<template>
  <button @click="formChange" class="flex items-center justify-center size-10 rounded-lg border-4 border-blue-900 overflow-hidden translate-2 hover:border-blue-500">
    <svg v-if="true" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Square -->
      <rect x="0" y="0" width="200" height="200" fill="none" stroke="none" stroke-width="0" />
      <rect x="0" y="130" width="200" height="70" fill="oklch(0.379 0.146 265.522)" stroke="none" stroke-width="0" />
    </svg>
  </button>
</template>

<script lang="ts" setup>

const props = defineProps<{
  changeTo: string;
}>();

const inectedFormChange = inject('changeFormType') as (type: string) => void;
const formChange = () => {
  console.log('Button clicked!');
  console.log(props.changeTo);
  // Call the function passed from the parent component
  if (inectedFormChange) {
  inectedFormChange(props.changeTo); // Call the function if it exists
} else {
  console.error('changeFormType was not provided!');
}
};

</script>

<style>

</style>