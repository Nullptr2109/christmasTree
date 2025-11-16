<script lang="ts">
  import { onMount } from "svelte";
  import Deer from "./lib/Deer.svelte";
  import Lights from "./lib/Lights.svelte";
  import SnowFlow from "./lib/SnowFlow.svelte";
  import Title from "./lib/Title.svelte";
  import Tree from "./lib/Tree.svelte";
  import SpiralScene from "./lib/SpiralScene.svelte";
  import { fade } from "svelte/transition";
  import Santa from "./lib/Santa.svelte";

  let show = $state(false);
  let show2 = $state(false);

  onMount(()=> {
    setTimeout(() => {
      show = true;
    }, 1000);
    setTimeout(() => {
      show2 = true;
    }, 3000);
  });
</script>

<main class="relative w-full h-full overflow-hidden">
  <div class="snow-layer">
    <SnowFlow/>
  </div>
  <div class="content">
    <div class="relative w-full mt-4 h-10" >
      <Lights />
    </div>
    <div class="relative w-full mt-4 top-4 h-10">
      <Lights />
    </div>
    <Title/>
    <div class="relative w-[300px] h-[475px] m-auto">
      <Tree {show} />
    </div>
    <Deer show={show2} />
  </div>
  <div class="z-10">
    <Santa />
  </div>
</main>

<style>
  .snow-layer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    z-index: 4; /* 雪花层 */
    pointer-events: none; /* 不影响鼠标事件 */
  }
  .content {
    position: relative;
    z-index: 2; /* 内容层 */
  }
</style>
