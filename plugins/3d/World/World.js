import { Color, Group, Vector3 } from 'three';
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

// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;
let loop;
let controls;

let focusedBirb;
class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
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


    // scene.background = new Color('teal')

    const resizer = new Resizer(container, camera, renderer);
    resizer.onResize = ()=>{
      // this.render();
    }

    controls.addEventListener('change', () => {
      // this.render();
    });
  }


  async init() {
    // asynchronous setup here
    // load bird models
    const {parrot , flamingo, stork} = await loadBirds();
    this.parrot = parrot;
    this.flamingo = flamingo;
    this.stork = stork;
    // parrot.position.z = - 10;
    parrot.scale.multiplyScalar(.02)

    flamingo.scale.multiplyScalar(.02)

    stork.scale.multiplyScalar(.02)


    scene.add(parrot, flamingo, stork)

    focusedBirb = this.parrot

    controls.target.copy(focusedBirb.position)
  }


  focusNext(){
    if (focusedBirb == this.parrot) focusedBirb = this.flamingo
    if (focusedBirb == this.flamingo) focusedBirb = this.stork
    if (focusedBirb == this.stork) focusedBirb = this.parrot
    console.log("focusBirb", focusedBirb)
    camera.lookAt(focusedBirb);
  }

  renderShapes(controls){

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
  renderLights(){

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

  renderGroup(){

    // const group = new Group();
    // for (let i = 0; i < 10; i++) {
    //   const sphere = createSphereBuffer({radius: .25});
    //   sphere.position.set(Math.sin(i) + .25 / 2, Math.cos(i) + 2, 0)
    //   group.add(sphere);
    // }
    // scene.add(group)
    //
  }

  renderMeshGroupSpheres(){
    const meshGroup = createMeshGroup();

    scene.add(meshGroup);

    loop.updatables.push(meshGroup)
  }

  // Train
  renderTrain(){
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


  start(){
    console.log("World.start()");
    loop.start();
    loop.tick();
  }

  stop(){
    loop.stop();
  }

}

export { World };
