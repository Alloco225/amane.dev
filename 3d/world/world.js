import { createCamera } from "../sys/camera.js";
import { createLights } from "../sys/lights.js";
import { createScene } from "../sys/scene.js";
import { createRenderer } from "../sys/renderer.js";
import { Loop } from "../sys/runner.js";
import { Resizer } from "../sys/resizer.js";
import createTerrain from "./terrain.js";

// These variables are module-scoped: we cannot access them
// from outside the module.
let camera;
let renderer;
let scene;
let loop;

let terrain = createTerrain({
  color: '#fe33aa',
});


class World {
  constructor(container) {
    // Instances of camera, scene, and renderer
    camera = createCamera();
    scene = createScene("blue");
    renderer = createRenderer();
    // Initialize Loop
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    // Light Instance, with optional light helper
    const { light, lightHelper } = createLights("white");
    loop.updatables.push(light);
    scene.add(light);

    const resizer = new Resizer(container, camera, renderer);
    resizer.onResize = () => {
      this.render();
    };

  }
  render() {
    // Draw a single frame
    renderer.render(scene, camera);
  }
  // Animation handlers
  start() {
    loop.start();


    loop.updatables.push(light);
    loop.updatables.push(terrain);

    scene.add(light, terrain);
  }
  stop() {
    loop.stop();
  }
}
export { World };
