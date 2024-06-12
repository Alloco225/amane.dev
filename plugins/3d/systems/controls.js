import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true;
  controls.dampingFactor = .01

  // Controls
  // controls.enabled = false;
  // controls.enableRotate = false;
  // controls.enableZoom = false;
  // controls.enablePan = false;

  // controls.autoRotate = true;
  controls.autoRotateSpeed = 1;
  controls.minDistance = 10;
  controls.maxDistance = 20;

  // MinMax Azimuth
  controls.minAzimuthAngle = - Infinity; // default
  controls.maxAzimuthAngle = Infinity; // default
  // MinMax Polar
  controls.minPolarAngle = 0; // default
  controls.maxPolarAngle = Math.PI; // default

  // keys
  controls.listenToKeyEvents(window);
  //
  controls.tick = () => controls.update();

  return controls;
}

export { createControls };
