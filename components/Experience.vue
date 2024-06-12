<template>
  <div class="body">
      <div id="scene-container"></div>
      <video id="webcam" autoplay playsinline width="100%" height="100%"></video>
  </div>
</template>

<script>
export default {
  name: 'Experience',

  methods: {
    start() {
      console.log('render')
    },
  },
}
</script>

<style>
body {
  margin: 0;
}
#scene-container {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 10;
}

</style>
