<script lang="ts">
  import { onMount } from "svelte";
  import { createScene } from "./scene";

  let { xrot, yrot } = $props();

  let c: HTMLCanvasElement;

  onMount(() => {
    createScene(c, () => {return {xrot, yrot}})
  });
</script>

<canvas
bind:this={c}
></canvas>

<style>
  canvas {
    height: 100%;
    width: 100%;
  }
</style>