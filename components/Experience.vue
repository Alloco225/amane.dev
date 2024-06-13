<template>
  <div class="body">
      <!-- <div id="scene-container"></div>
      <video id="webcam" autoplay playsinline width="100%" height="100%"></video> -->
      <main id="virtual-glasses-app">
        <div class="form-control webcam-start" id="webcam-control">
            <label class="form-switch">
                <input type="checkbox" id="webcam-switch">
                <i></i>
                <span id="webcam-caption">Try it On</span>
            </label>
            <button id="cameraFlip" class="btn d-none"></button>
        </div>
        <div id="image-container">

            <canvas id="canvas" width="640" height="480"></canvas>
            <div class="loading d-none">
                Loading Model
                <div class="spinner-border" role="status">
                    <span class="sr-only"></span>
                </div>
            </div>

            <div id="glasses-slider">
                <img id="arrowLeft" src="/images/arrow-left.png">
                <div id="glasses-list">
                    <ul>
                        <li class="selected-glasses">
                            <img src="/3dmodel/glasses-01/glasses_01.png" data-3d-type="gltf"
                                data-3d-model-path="3dmodel/glasses-01/" data-3d-model="scene.gltf" data-3d-x="0"
                                data-3d-y="0.5" data-3d-z="0" data-3d-up="10" data-3d-scale="0.01">
                        </li>
                        <li>
                            <img src="/3dmodel/glasses-02/glasses_02.png" data-3d-type="gltf"
                                data-3d-model-path="3dmodel/glasses-02/" data-3d-model="scene.gltf" data-3d-x="0"
                                data-3d-y="0.3" data-3d-z="0" data-3d-up="0" data-3d-scale="0.4">
                        </li>
                        <li>
                            <img src="/3dmodel/glasses-03/glasses_03.png" data-3d-type="gltf"
                                data-3d-model-path="3dmodel/glasses-03/" data-3d-model="scene.gltf" data-3d-x="0"
                                data-3d-y="0.3" data-3d-z="0" data-3d-up="-40" data-3d-scale="0.4">
                        </li>
                        <li>
                            <img src="/3dmodel/glasses-04/glasses_04.png" data-3d-type="gltf"
                                data-3d-model-path="3dmodel/glasses-04/" data-3d-model="scene.gltf" data-3d-x="0"
                                data-3d-y="0.5" data-3d-z="0" data-3d-up="0" data-3d-scale="12">
                        </li>
                        <li>
                            <img src="/3dmodel/glasses-05/glasses_05.png" data-3d-type="gltf"
                                data-3d-model-path="3dmodel/glasses-05/" data-3d-model="scene.gltf" data-3d-x="0"
                                data-3d-y="0" data-3d-z="0" data-3d-up="-80" data-3d-scale="0.11">
                        </li>
                        <li>
                            <img src="/3dmodel/glasses-06/glasses_06.png" data-3d-type="gltf"
                                data-3d-model-path="3dmodel/glasses-06/" data-3d-model="scene.gltf" data-3d-x="0"
                                data-3d-y="0.3" data-3d-z="0" data-3d-up="-30" data-3d-scale="0.1">
                        </li>
                        <li>
                            <img src="/3dmodel/glasses-07/glasses_07.png" data-3d-type="gltf"
                                data-3d-model-path="3dmodel/glasses-07/" data-3d-model="scene.gltf" data-3d-x="0"
                                data-3d-y="0.3" data-3d-z="0" data-3d-up="0" data-3d-scale="0.8">
                        </li>
                    </ul>
                </div>
                <img id="arrowRight" src="/images/arrow-right.png">
            </div>
        </div>


        <div id="errorMsg" class="col-12 col-md-6 alert-danger d-none">
            Fail to start camera, please allow permision to access camera. <br />
            If you are browsing through social media built in browsers, you would need to open the page in Sarafi
            (iPhone)/ Chrome (Android)
            <button id="closeError" class="btn btn-primary ml-3">OK</button>
        </div>
        <div class="md-modal md-effect-12">
            <div id="app-panel" class="app-panel md-content row p-0 m-0">
                <div id="webcam-container" class="webcam-container col-12 d-none p-0 m-0">
                    <video id="webcam" autoplay playsinline width="640" height="480"></video>
                </div>
            </div>
        </div>
        <div class="md-overlay"></div>
    </main>
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
