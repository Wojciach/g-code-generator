<template>
    <div id='downloadButton'>
      <h1>Generate and Download Text File</h1>
      <textarea id="textArea" ref="textArea" rows="10" cols="50" placeholder="Type your text here..."></textarea>
      <br><br>
      <button id="downloadButton" ref="myButton" @click="handleClick">Download as .txt</button>
    </div>
</template>

<script lang="ts" setup>

  const myButton = ref<HTMLButtonElement | null>(null);
  const textArea = ref<HTMLButtonElement | null>(null);

    const handleClick = () => {
      
      if(textArea.value) {
        
        const text = textArea.value.value;
        const blob = new Blob([text], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "output.txt";
        a.click();
        URL.revokeObjectURL(a.href);
      }
  }

</script>

<style>

</style>