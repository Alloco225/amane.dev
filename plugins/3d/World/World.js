import { Color, Vector3 } from 'three';
import { createCamera } from '../components/camera.js';
import { createCube } from '../components/meshes/cube.js';
import { createScene } from '../components/scene.js';

import { createRenderer } from '../systems/renderer.js';
import { Resizer } from '../systems/Resizer.js';
import { createDonut } from '../components/meshes/donut.js';
import { createTriangle } from '../components/meshes/triangle.js';
import { createDirectionalLight, createPointLight, createReactAreaLight, createSpotLight, } from '../components/lights.js';
import { Loop } from '../systems/Loop.js';
import { createControls } from '../systems/controls.js';

// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    //
    const controls = createControls(camera, renderer.domElement);

    //
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);


    //
    loop.updatables.push(controls)


    const sunLight = createDirectionalLight({color: 'red', intensity: 2});
    sunLight.position.set(-10, 10, 10)


    const windowLight = createReactAreaLight({color: 'white', intensity: .5, width: 10, height: 10});
    windowLight.position.set(-5, 5, 5)

    const spotLight = createSpotLight({color: 'pink', intensity: 10, distance: 5, angle: 2});
    spotLight.position.set(0, 5, 0)

    const pointLight = createPointLight({color: 'pink', intensity: 10, distance: 5, angle: 2});
    pointLight.position.set(1, 0, 0)

    //
    const cube = createCube({color: 'blue'});
    const donut = createDonut();
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
    controls.target.copy(cube.position)


    // setTimeout(() => {
    //   // move the camera
    //   camera.position.set(1, 2, 3);

    //   // and/or rotate the camera
    //   camera.rotation.set(0.5, 0, 0);

    //   // then tell the controls to update
    //   // controls.update();

    // }, 3000);


    //
    scene.add(sunLight);
    scene.add(spotLight);
    // scene.add(pointLight);
    scene.add(windowLight);
    //
    scene.add(cube, donut, triangle);


    // scene.background = new Color('teal')

    const resizer = new Resizer(container, camera, renderer);
    resizer.onResize = ()=>{
      // this.render();
    }

    controls.addEventListener('change', () => {
      // this.render();
    });
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
