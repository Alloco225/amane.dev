import { CircleGeometry, Color, ConeGeometry, Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { createCamera } from '../components/camera.js';
import { createCube } from '../components/meshes/cube.js';
import { createScene } from '../components/scene.js';

import { createRenderer } from '../systems/renderer.js';
import { Resizer } from '../systems/Resizer.js';
import { createDonut } from '../components/meshes/donut.js';
import { createTriangle } from '../components/meshes/triangle.js';
import { createDirectionalLight, createHemisphereLight, createPointLight, createReactAreaLight, createSpotLight, } from '../components/lights.js';
import { Loop } from '../systems/Loop.js';
import { createControls } from '../systems/controls.js';
import { createSphereBuffer } from '../components/meshes/sphere_buffer.js';
import { createMeshGroup } from '../components/meshes/mershGroup.js';
import { Train } from '../components/Train/Train.js';
import { loadBirds } from '../components/birds/birds.js';
import { loadGlasses } from '../components/glasses/glasses.js';
import { NumberKeyframeTrack, VectorKeyframeTrack } from "three";

const facemesh = require('@tensorflow-models/facemesh');


// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;
let loop;
let controls;

let focusedBirb;

let glasses;
let model;
let cameraFrame;

let meManagerModel;
let meDevModel;
let meDesignerModel;

let detectFacesInterval;

let glassesKeyPoints = { midEye: 168, leftEye: 143, noseBottom: 2, rightEye: 372 };

class World {
  constructor(container) {
    camera = createCamera(
      {
        fov: 45,
        aspect: 1,
        near: 0.1,
        far: 2000
      }
    );
    // renderer = createRenderer({
    //   // canvas: canvasElement,
    //   alpha: true
    // });
    // camera = createCamera();
    renderer = createRenderer();
    renderer.domElement.id = '3js-canvas'
    scene = createScene();
    //
    controls = createControls(camera, renderer.domElement);

    //
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    //
    loop.updatables.push(controls)

    this.renderLights();

    //

    // this.renderMeshGroupSpheres();

    // train
    // this.renderTrain();

    // this.renderShapes(controls);

    //
    //




    const times = [0, 1, 2, 3, 4];
    const values = [0, 1, 0, 1, 0];

    const opacityKF = new NumberKeyframeTrack(".material.opacity", times, values);



    const vTimes = [0, 3, 6];
    const vValues = [0, 0, 0, 2, 2, 2, 0, 0, 0];

    const positionKF = new VectorKeyframeTrack(".position", vTimes, vValues);

    // scene.background = new Color('teal')

    const resizer = new Resizer(container, camera, renderer);
    resizer.onResize = () => {
      // this.render();
    }

    controls.addEventListener('change', () => {
      // this.render();
    });
  }


  async init() {
    await this.initGlasses();
    // await this.initBirbs();
  }

  async initAR(videoElement) {
    console.log("initAR", videoElement)
    const videoHeight = videoElement.height;
    const videoWidth = videoElement.width;

    renderer.setSize(videoWidth, videoHeight);
    renderer.setClearColor(0x000000, 0);

    camera.position.x = videoWidth / 2;
    camera.position.y = -videoHeight / 2;
    camera.position.z = -(videoHeight / 2) / Math.tan(45 / 2);
    camera.lookAt({ x: videoWidth / 2, y: -videoHeight / 2, z: 0, isVector3: true });
  }

  async executeAR(webcamElement) {
    console.log("executeAR")
    webcamElement.play();
    faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh)
      .then(mdl => {
        console.log("model", mdl)
        model = mdl;
        clearInterval(detectFacesInterval);
        detectFacesInterval =
          setInterval(() => {

            cameraFrame = detectFaces();
          }, 1000);
      });

    async function detectFaces() {
      await model.estimateFaces
        ({
          input: webcamElement,
          returnTensors: false,
          flipHorizontal: false,
          predictIrises: false
        }).then(faces => {
          console.log("faces", faces)
          drawglasses(faces).then(() => {

            // cameraFrame = requestAnimFrame(detectFaces);
          });
        });



      async function drawglasses(faces) {
        console.log("drawGlasses", faces)

        for (let i = 0; i < faces.length; i++) {
          let face = faces[i];
          if (typeof glasses !== "undefined" && typeof face !== "undefined") {
            let pointMidEye = face.scaledMesh[glassesKeyPoints.midEye];
            let pointleftEye = face.scaledMesh[glassesKeyPoints.leftEye];
            let pointNoseBottom = face.scaledMesh[glassesKeyPoints.noseBottom];
            let pointrightEye = face.scaledMesh[glassesKeyPoints.rightEye];

            glasses.position.x = pointMidEye[0];
            glasses.position.y = -pointMidEye[1] + parseFloat(glasses.position.y);
            glasses.position.z = -camera.position.z + pointMidEye[2];

            glasses.up.x = pointMidEye[0] - pointNoseBottom[0];
            glasses.up.y = -(pointMidEye[1] - pointNoseBottom[1]);
            glasses.up.z = pointMidEye[2] - pointNoseBottom[2];
            const length = Math.sqrt(glasses.up.x ** 2 + glasses.up.y ** 2 + glasses.up.z ** 2);
            glasses.up.x /= length;
            glasses.up.y /= length;
            glasses.up.z /= length;

            const eyeDist = Math.sqrt(
              (pointleftEye[0] - pointrightEye[0]) ** 2 +
              (pointleftEye[1] - pointrightEye[1]) ** 2 +
              (pointleftEye[2] - pointrightEye[2]) ** 2
            );
            glasses.scale.x = eyeDist * parseFloat(glasses.scale.x);
            glasses.scale.y = eyeDist * parseFloat(glasses.scale.y);
            glasses.scale.z = eyeDist * parseFloat(glasses.scale.z);

            glasses.rotation.y = Math.PI;
            glasses.rotation.z = Math.PI / 2 - Math.acos(glasses.up.x);

            glasses.position.x /= 100
            glasses.position.y /= 100
            glasses.position.z /= 100

            glasses.scale.x /= 100
            glasses.scale.y /= 100
            glasses.scale.z /= 100

            console.log("glasses", glasses.position, glasses.scale);
            // renderer.render(scene, camera);
          }
        }
      }

    }
  }

  async initBirbs() {

    // asynchronous setup here
    // load bird models
    const { parrot, flamingo, stork } = await loadBirds();
    this.parrot = parrot;
    this.flamingo = flamingo;
    this.stork = stork;
    // parrot.position.z = - 10;
    parrot.scale.multiplyScalar(.02)

    flamingo.scale.multiplyScalar(.02)

    stork.scale.multiplyScalar(.02)


    scene.add(parrot, flamingo, stork)
    loop.updatables.push(parrot, flamingo, stork)


    controls.target.copy(parrot.position)
  }

  async initGlasses() {

    // asynchronous setup here
    // load bird models
    const { roundedRectangleGlasses } = await loadGlasses();
    glasses = roundedRectangleGlasses;
    glasses.scale.multiplyScalar(3)


    scene.add(roundedRectangleGlasses)
    loop.updatables.push(glasses)


    // controls.target.copy(roundedRectangleGlasses.position)
  }


  focusNext() {
    if (focusedBirb == this.parrot) focusedBirb = this.flamingo
    if (focusedBirb == this.flamingo) focusedBirb = this.stork
    if (focusedBirb == this.stork) focusedBirb = this.parrot
    console.log("focusBirb", focusedBirb)
    camera.lookAt(focusedBirb);
  }

  renderShapes(controls) {

    const cube = createCube({ color: 'blue' });
    const donut = createDonut({ color: 'red' });
    const triangle = createTriangle();

    //

    donut.position.set(1, 0, 0)
    cube.position.set(2, 0, 0)
    triangle.position.set(4, 0, 0)
    //
    cube.rotation.set(1, 1, 1)

    // Game Loop

    loop.updatables.push(cube)
    loop.updatables.push(donut)

    // Controls
    scene.add(cube, donut, triangle);

    controls.target.copy(cube.position)
  }
  renderLights() {

    // Direct lights
    const sunLight = createDirectionalLight({ color: 'red', intensity: 2 });
    sunLight.position.set(-10, 10, 10)


    const windowLight = createReactAreaLight({ color: 'white', intensity: .5, width: 10, height: 10 });
    windowLight.position.set(-5, 5, 5)

    const spotLight = createSpotLight({ color: 'pink', intensity: 10, distance: 5, angle: 2 });
    spotLight.position.set(0, 5, 0)

    const pointLight = createPointLight({ color: 'pink', intensity: 10, distance: 5, angle: 2 });
    pointLight.position.set(1, 0, 0)

    // Indirect lights
    const hemisphereLight = createHemisphereLight({ skyColor: 'pink', groundColor: 'skyblue', intensity: 1, });
    // pointLight.position.set(1, 0, 0)


    scene.add(sunLight);
    scene.add(spotLight);
    scene.add(hemisphereLight);
    // scene.add(pointLight);
    scene.add(windowLight);
  }

  renderGroup() {

    // const group = new Group();
    // for (let i = 0; i < 10; i++) {
    //   const sphere = createSphereBuffer({radius: .25});
    //   sphere.position.set(Math.sin(i) + .25 / 2, Math.cos(i) + 2, 0)
    //   group.add(sphere);
    // }
    // scene.add(group)
    //
  }

  renderMeshGroupSpheres() {
    const meshGroup = createMeshGroup();

    scene.add(meshGroup);

    loop.updatables.push(meshGroup)
  }

  // Train
  renderTrain() {
    // Train
    const train = new Train();
    train.scale.multiplyScalar(.5)
    train.position.set(1, 1.5, 0)

    loop.updatables.push(train)
    scene.add(train)
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }


  start() {
    console.log("World.start()");
    loop.start();
    loop.tick();
  }

  stop() {
    loop.stop();
  }

}

export { World };
