<script lang="ts">
  import { onMount } from "svelte";
  import { SpiralScene } from "./SpiralScene";

    let canvas: HTMLCanvasElement | null = $state(null);

    onMount(() => {
        if (canvas) {
            const scene = new SpiralScene(canvas);
            scene.start();
        }
    });
</script>
<canvas class="w-full h-full" bind:this={canvas}>

</canvas>