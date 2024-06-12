import { drawResults, isMobile } from './tensorflow/shared/util';
import { getCameraFeed } from './components/camera_feed/getCameraFeed.js';
import { World } from './World/World.js';


import * as faceMesh from '@mediapipe/face_mesh';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';


let world;
let feed;
let video;
let model;

let detector;

async function main() {
  await initThree();
  await initAR();
}

async function initThree() {
  const container = document.querySelector('#scene-container');

  // 1. Create an instance of the World app
  world = new World(container);


  /*
  // produce a single frame (render on demand)
  world.render();
  */

  // // complete async tasks
  await world.init();

  // start the loop (produce a stream of frames)
  world.start();



}

async function initAR() {

  const STATE = {
    "camera": {
      "targetFPS": 60,
      "sizeOption": "640 X 480"
    },
    "backend": "mediapipe-gpu",
    "flags": {},
    "modelConfig": {
      "maxFaces": 1,
      "refineLandmarks": true,
      "triangulateMesh": true,
      "boundingBox": true
    },
    "model": "MediaPipeFaceMesh"
  }

  const VIDEO_SIZE = {
    '640 X 480': { width: 640, height: 480 },
    '640 X 360': { width: 640, height: 360 },
    '360 X 270': { width: 360, height: 270 }
  };

  let sizeOption = STATE.camera.sizeOption;
  let $size = VIDEO_SIZE[sizeOption];

  let targetFPS = STATE.camera.targetFPS;

  const videoConfig = {
    'audio': false,
    'video': {
      facingMode: 'user',
      // Only setting the video to a specified size for large screen, on
      // mobile devices accept the default size.
      width: isMobile() ? VIDEO_SIZE['360 X 270'].width : $size.width,
      height: isMobile() ? VIDEO_SIZE['360 X 270'].height : $size.height,
      frameRate: {
        ideal: targetFPS,
      },
    },
  };


  let video = document.getElementById('video');
  let canvas = document.getElementById('threejs-canvas');
  console.log("canvas", canvas)
  // let ctx = canvas.getContext('2d');
  let ctx = await world.getContext();
  // let ctx = canvas.getContext('webgl');
  console.log("ctx", ctx)



  const stream = await navigator.mediaDevices.getUserMedia(videoConfig);
  video.srcObject = stream;

  await new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });


  video.play();

  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;
  // Must set below two lines, otherwise video element doesn't show.
  video.width = videoWidth;
  video.height = videoHeight;

  canvas.width = videoWidth;
  canvas.height = videoHeight;
  const canvasContainer = document.querySelector('.canvas-wrapper');
  canvasContainer.style = `width: ${videoWidth}px; height: ${videoHeight}px`;


  // Because the image from camera is mirrored, need to flip horizontally.
  // ctx.translate(video.videoWidth, 0);
  // ctx.scale(-1, 1);


  async function createDetector() {
    const runtime = STATE.backend.split('-')[0];
    return faceLandmarksDetection.createDetector(STATE.model, {
      runtime,
      refineLandmarks: STATE.modelConfig.refineLandmarks,
      maxFaces: STATE.modelConfig.maxFaces,
      solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@${faceMesh.VERSION}`
    });
  }


  // Create detector
  try {
    detector = await createDetector(STATE.model);
    console.log("detector", detector)
  } catch (error) {
    detector = null;
    alert(error);
  }


  async function renderResult() {
    if (video.readyState < 2) {
      await new Promise((resolve) => {
        video.onloadeddata = () => {
          resolve(video);
        };
      });
    }

    let faces = null;

    // Detector can be null if initialization failed (for example when loading
    // from a URL that does not exist).
    if (detector != null) {
      // Detectors can throw errors, for example when using custom URLs that
      // contain a model that doesn't provide the expected output.
      try {
        faces =
          await detector.estimateFaces(video, { flipHorizontal: false });
      } catch (error) {
        detector.dispose();
        detector = null;
        alert(error);
      }
    }

    console.log("faces", faces)

    // console.log(STATE)

    // drawCtx();

    // The null check makes sure the UI is not in the middle of changing to a
    // different model. If during model change, the result is from an old model,
    // which shouldn't be rendered.
    if (faces && faces.length > 0 && !STATE.isModelChanged) {
      // drawResults(
      //   faces, STATE.modelConfig.triangulateMesh,
      //   STATE.modelConfig.boundingBox);
    }
  }


  async function renderPrediction() {

    // if (!STATE.isModelChanged) {
      await renderResult();
    // }

    // rafId = requestAnimationFrame(renderPrediction);
  };

  renderPrediction();
}

main();