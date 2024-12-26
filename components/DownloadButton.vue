<template>
    <div id='downloadButton'>
      <h1>Generate and Download Text File</h1>

      <button class="btn" @click="handleClick">{{ name }}</button>
    </div>
    
</template>

<script lang="ts" setup>

  const props = defineProps<{
    name: string;
    svgRef: Ref<SVGSVGElement | null>;
  }>();

    const handleClick = () => {
      console.log(props.svgRef);
      
      if(props.svgRef) {
        console.log('click handled');
        const element = props.svgRef.outerHTML;
        const blob = new Blob([element], { type: "image/svg+xml" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "output.svg";
        a.click();
        URL.revokeObjectURL(a.href);
      }

      
  }

</script>

<style>

.btn {
  @apply px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition;
}

</style>