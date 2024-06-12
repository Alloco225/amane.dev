<template>
  <div class="body">
    <!-- <div id="stats"></div> -->
    <div id="main">
      <div id="scene-container"></div>
      <div class="container">
        <div class="canvas-wrapper">
          <!-- <canvas id="output"></canvas> -->
          <video
            id="video"
            playsinline
            style="
              -webkit-transform: scaleX(-1);
              transform: scaleX(-1);
              visibility: hidden;
              width: 100%;
              height: 100%;
            "
          ></video>
        </div>
      </div>
    </div>
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
  z-index: -10;
}

#stats {
  position: relative;
  width: 100%;
  height: 80px;
}

#main {
  position: relative;
  margin: 0;
}

#canvas-wrapper {
  position: relative;
}
</style>
