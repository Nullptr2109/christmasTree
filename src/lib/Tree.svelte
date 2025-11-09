<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from "svelte/transition"
     let show2 = $state(false);
    let { show = true} = $props();
    onMount(()=> {

      setTimeout(() => {
        show2 = true;
      }, 2000);
    });
</script>
{#if show}
<div class="tree-container" transition:fade>
  <div class="tree">
    <div class="star"></div>
    <div class="cone tree-cone1"></div>
    <div class="cone tree-cone2"></div>
    <div class="cone tree-cone3"></div>
    <div class="trunk"></div>
    <div class="ornament or1">
      <div class="shine"></div>
    </div>
    <div class="ornament or2">
      <div class="shine"></div>
    </div>
    <div class="ornament or3">
      <div class="shine"></div>
    </div>
    <div class="ornament or4">
      <div class="shine"></div>
    </div>
    <div class="ornament or5">
      <div class="shine"></div>
    </div>
    <div class="ornament or6">
      <div class="shine"></div>
    </div>
    <div class="bells-container">
      <div class="bell bell1">
        <div class="bell-top"></div>
        <div class="bell-bottom"></div>
        <div class="bell-mid"></div>
      </div>
      <div class="bell bell2">
        <div class="bell-top"></div>
        <div class="bell-bottom"></div>
        <div class="bell-mid"></div>
      </div>
      <div class="bow">
        <div class="b1"></div>
        <div class="b2"></div>
        <div class="b3"></div>
      </div>
    </div>
  </div>
{#if show2}
<div transition:fly={{x: -200, y: -200, duration: 2000}}>
    <div class="gift"></div>
    <div class="ribbon"></div>
    <div class="gift2"></div>
    <div class="ribbon2"></div>
    <div class="shadow"></div>
</div>
{/if}
</div>
{/if}
<style lang="scss" scoped>
  /* gifts*/
  .gift {
    position: absolute;
    width: 60px;
    height: 50px;
    background-color: #ffc857;
    top: 365px;
    left: 30px;
    box-shadow: inset -8px 0 0 rgba(0, 0, 0, 0.07);
  }

  .gift:before {
    content: "";
    position: absolute;
    width: 70px;
    height: 20px;
    left: -5px;
    background-color: #ffc857;
    box-shadow: inset -8px -4px 0 rgba(0, 0, 0, 0.07);
  }

  .gift:after {
    content: "";
    background-color: #db3a34;
    width: 10px;
    height: 50px;
    position: absolute;
    left: 25px;
  }

  .ribbon {
    position: absolute;
    width: 20px;
    height: 10px;
    border: 3px solid #db3a34;
    border-radius: 50%;
    transform: skew(15deg, 15deg);
    top: 350px;
    left: 35px;
  }

  .ribbon:before {
    content: "";
    position: absolute;
    width: 20px;
    height: 10px;
    border: 3px solid #db3a34;
    border-radius: 50%;
    transform: skew(-15deg, -20deg);
    left: 22px;
    top: -8px;
  }

  .gift2 {
    position: absolute;
    width: 50px;
    height: 40px;
    background-color: #08bdbd;
    top: 380px;
    left: 150px;
    box-shadow: inset -8px 0 0 rgba(0, 0, 0, 0.07);
  }

  .gift2:before {
    content: "";
    position: absolute;
    width: 60px;
    height: 15px;
    background-color: #08bdbd;
    left: -5px;
    box-shadow: inset -8px -4px 0 rgba(0, 0, 0, 0.07);
  }

  .gift2:after {
    content: "";
    background-color: #abff4f;
    width: 10px;
    height: 40px;
    position: absolute;
    left: 20px;
  }

  .ribbon2 {
    position: absolute;
    width: 15px;
    height: 7px;
    border: 3px solid #abff4f;
    border-radius: 50%;
    transform: skew(15deg, 15deg);
    top: 370px;
    left: 155px;
  }

  .ribbon2:before {
    content: "";
    position: absolute;
    width: 15px;
    height: 7px;
    border: 3px solid #abff4f;
    border-radius: 50%;
    transform: skew(-15deg, -20deg);
    left: 15px;
    top: -8px;
  }
  .tree-container {
    position: relative;
    width: 100%;
    height: 100%;
    // width: 300px;
    // height: 475px;
    // margin: auto;
    // z-index: -2;
    overflow: hidden;
  }

  .tree {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 5%;
  }

  .star {
    position: absolute;
    width: 100px;
    height: 100px;
    background: #a18006;
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
    left: 95px;
    z-index: 4;
    filter: drop-shadow(0.75em 0.75em 0.5em);
  }

  .cone {
    width: 150px;
    height: 100px;
    border-radius: 45%;
    background: radial-gradient(farthest-side at top, #026e46, #024e32);
    -webkit-mask: conic-gradient(
      from 150deg at top,
      #0000,
      #000 1deg 60deg,
      #0000 61deg
    );
  }

  .tree-cone1 {
    position: absolute;
    top: 50px;
    width: 200px;
    height: 180px;
    left: 45px;
    z-index: 3;
  }

  .tree-cone2 {
    position: absolute;
    top: 75px;
    width: 240px;
    height: 220px;
    left: 25px;
    z-index: 2;
  }

  .tree-cone3 {
    position: absolute;
    top: 115px;
    width: 260px;
    height: 240px;
    left: 15px;
  }

  .trunk {
    position: absolute;
    top: 310px;
    width: 75px;
    height: 75px;
    background: radial-gradient(farthest-side at top, #4e2402, #351801);
    z-index: -1;
    left: 105px;
  }

  /* ornaments */
  .ornament {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 0 0 3px #033b26;
    z-index: 4;
  }

  .shine {
    position: absolute;
    width: 55%;
    height: 55%;
    top: 10%;
    right: 11%;
    border-radius: 50%;
    background: white;
    filter: opacity(60%);
  }

  .or1 {
    left: 28%;
    top: 34%;
    background: #0742d9;
  }
  .or2 {
    left: 60%;
    top: 40%;
    background: #c91212;
  }
  .or3 {
    left: 20%;
    top: 49%;
    background: #dbb700;
  }
  .or4 {
    left: 48%;
    top: 55%;
    background: #0742d9;
  }
  .or5 {
    left: 70%;
    top: 65%;
    background: #dbb700;
  }
  .or6 {
    left: 25%;
    top: 63%;
    background: #c91212;
  }

  .bells-container {
    position: relative;
    left: 80px;
    top: 65px;
  }

  .bell1,
  .bell2 {
    width: 30px;
    height: 0;
    border-bottom: 35px solid #d4a429;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    z-index: 11;
  }

  .bell1 {
    position: relative;
    top: 50px;
    left: 50px;
    transform: rotate(25deg);
  }
  .bell2 {
    position: relative;
    top: 15px;
    left: 90px;
    transform: rotate(-25deg);
  }

  .bell-top {
    width: 30px;
    height: 15px;
    background-color: #d4a429;
    position: relative;
    bottom: 13px;
    border-radius: 15px 15px 0 0;
  }
  .bell-bottom {
    width: 41px;
    height: 0;
    border-bottom: 10px solid #d4a445;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    position: relative;
    top: 19px;
    right: 11px;
    border-radius: 0 0 7.5px 7.5px;
  }

  .bell-mid {
    background-color: #d4a429;
    height: 7.5px;
    width: 15px;
    position: relative;
    top: 18.5px;
    border-radius: 0 0 7.5px 7.5px;
  }

  .bow {
    position: relative;
    left: 68px;
    bottom: 45px;
    transform: rotate(-5deg);
    z-index: 12;
  }
  .b1 {
    height: 12.5px;
    width: 0;
    border-right: 20px solid #e95840;
    border-top: 7.5px solid transparent;
    border-bottom: 7.5px solid transparent;
    position: relative;
    bottom: 8.5px;
    left: 30px;
  }
  .b2 {
    height: 12.5px;
    width: 0;
    border-left: 20px solid #e95840;
    border-top: 7.5px solid transparent;
    border-bottom: 7.5px solid transparent;
    position: relative;
    bottom: 36px;
    left: 0px;
  }

  .b3 {
    background-color: #e4391b;
    height: 20px;
    width: 17.5px;
    border-radius: 7.5px;
    position: relative;
    bottom: 60px;
    left: 16px;
  }

  .shadow {
    background-color: rgba(0, 0, 0, 0.07);
    position: absolute;
    width: 270px;
    height: 40px;
    border-radius: 50%;
    top: 390px;
    left: 10px;
    z-index: -1;
  }
</style>
