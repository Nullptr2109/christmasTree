<script lang="ts">
  import { onMount } from 'svelte';
import Render from './Render';

	let canvas: HTMLCanvasElement | null = $state(null);
	let render: Render | null = null;

	onMount(() =>{
		if (canvas) {
			console.log('canvas', canvas.width, canvas.height);
			render = new Render(canvas);
			render.init();
		}
	});
</script>

<canvas class="w-full h-full" bind:this={canvas}>

</canvas>