import { Color, Vector3 } from 'three';
import { createCamera } from '../components/camera.js';
import { createCube } from '../components/meshes/cube.js';
import { createScene } from '../components/scene.js';

import { createRenderer } from '../systems/renderer.js';
import { Resizer } from '../systems/Resizer.js';
import { createDonut } from '../components/meshes/donut.js';
import { createTriangle } from '../components/meshes/triangle.js';
import { createDirectionalLight, createPointLight, createReactAreaLight, createSpotLight, } from '../components/lights.js';

// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    container.append(renderer.domElement);

    const sunLight = createDirectionalLight({color: 'red', intensity: 2});
    sunLight.position.set(-10, 10, 10)


    const windowLight = createReactAreaLight({color: 'white', intensity: .5, width: 10, height: 10});
    windowLight.position.set(-5, 5, 5)

    const spotLight = createSpotLight({color: 'pink', intensity: 10, distance: 5, angle: 2});
    spotLight.position.set(0, 5, 0)

    const pointLight = createPointLight({color: 'pink', intensity: 10, distance: 5, angle: 2});
    pointLight.position.set(1, 0, 0)

    //
    const cube = createCube({color: 'purple'});
    const donut = createDonut();
    const triangle = createTriangle();
    //
    donut.position.set(1, 0, 0)
    cube.position.set(2, 0, 0)
    triangle.position.set(4, 0, 0)
    //
    cube.rotation.set(1, 1, 1)
    //
    scene.add(sunLight);
    scene.add(spotLight);
    scene.add(pointLight);
    scene.add(windowLight);
    // 
    scene.add(cube, donut, triangle);


    // scene.background = new Color('teal')

    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }
}

export { World };
