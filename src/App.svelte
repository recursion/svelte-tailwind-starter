<script>
  import { draggable } from "./draggable";
  import { onMount } from "svelte";
  export let name;
  let container;
  const dragOptions = {
    boundingBox: true,
    container
  };
  onMount(() => {
    dragOptions.container = container;
  });
</script>

<style>
  :global(body) {
    overflow-y: hidden;
  }
  .draggable {
    border: 1px solid black;
    border-radius: 5%;
    width: 100px;
    height: 100px;
  }
  .screen {
    height: 97.7vh;
  }
</style>

<div class="screen" bind:this={container}>
  <h1 class="text-center bg-green-500 text-white font-mono">{name}!</h1>
  <div class="draggable" use:draggable={dragOptions} />
</div>
