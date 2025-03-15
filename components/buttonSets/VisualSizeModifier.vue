<template>
        <div class="w-full flex flex-row flex-wrap justify-center items-center">
          <label for="visualSizeModifier" class="w-16">Scale: {{ Math.round(Number(visualSizeModifier) * 6.36 )}}</label>
          <input
            class="flex-grow"
            id="visualSizeModifier"
            type="range"
            :value="visualSizeModifier"
            @input="$emit('update:visualSizeModifier', Number($event.target.value))"
            :min="0.1"
            :max="3"
            :step="0.1"
          />
        </div>
</template>

<script lang="ts" setup>
import { useGlobalState } from '~/utils/composables/useGlobalState';
const global = reactive(useGlobalState());
const props = defineProps<{
  visualSizeModifier: number
}>()

</script>

<style>

</style>