import { getCameraFeed } from './components/camera_feed/getCameraFeed.js';
import { World } from './World/World.js';

import {app} from './tensorflow/index.js';


let world;
let feed;
let video;
let model;

video = document.getElementById('video')


async function initCameraFeed() {


  feed = await getCameraFeed();
  
  // console.log("init", feed);
  video.srcObject = feed;
  video.play();
}

async function main() {
  console.log("main");

  // TODO [x] - 1: show camera feed as video
  // TODO [-] - 2: show face info as canvas overlay with face-api.js
  // TODO [] - 3: import models with 3.js
  // TODO [] - 4: calculate rotation and position of models on face mesh data
  // TODO [] - 5: interpolate data with gsap for smooth animation
  // TODO [] - 6: make it a saas
  // TODO [] - 7: become filthy rich lol


  //


  // Just use the feed for starters

  // initCameraFeed();
  // app();
  // initTensorFlow();

  // setTimeout(() => {
  //   detectFaces();
  // }, 3000);

  // initFaceJs();

  // Get a reference to the container element
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


  //

  // setUpEventListeners();

  app();
}


function setUpEventListeners() {

  let button = document.querySelector('#start-btn')
  button?.addEventListener('click', launchRender)

  document.querySelector('#focusNext-btn').addEventListener('click', focusNext)
}

function launchRender() {

  console.log("clicked start");
  // main();
}

function focusNext() {
  console.log("focusNext")
  world.focusNext();
}

main().catch((err) => {
  console.error('xx main', err);
});


// export default { main }

  
  // video.addEventListener("loadeddata", async () => {
  //   console.log("video loaded");
  //   model = await blazeface.load();
  //   console.log("model loaded", model);
  //   // Calling the detectFaces every 40 millisecond
  //   // setInterval(detectFaces, 2000);
  // });