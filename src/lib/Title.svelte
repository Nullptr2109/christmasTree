<script lang="ts">
    let { label = "Happy To You  jingjing 🎄" } = $props();
</script>

<h1 class="label">{label}</h1>

<style scoped lang="scss">
.label {
  font-family: "Berkshire Swash";
// font-family: 'Source Han Serif';
  font-weight: normal;
//   font-size: 150%;
  color: green;
  padding-top: 5%;
  text-align: center;
  text-shadow: 10px 10px 5px black;
  animation-name: move;
  animation-iteration-count: infinite;
  animation-duration: 4s;
}
@keyframes move {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 0.75em, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>