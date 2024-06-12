import { PerspectiveCamera } from 'three';

function createCamera(options = {
  fov: 35,
  aspect: 1,
  near: 0.1,
  far: 100
}) {
  // const camera = new PerspectiveCamera(options);
  // const camera = new PerspectiveCamera(
  //   35,
  //   1,
  //   0.1,
  //   100
  // );
  const camera = new PerspectiveCamera(
    options.fov,
    options.aspect,
    options.near,
    options.far
  );

  // move the camera back so we can view the scene
  camera.position.set(0, 0, 10);

  return camera;
}

export { createCamera };
