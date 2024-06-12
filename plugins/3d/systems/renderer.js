import { WebGLRenderer } from 'three';

function createRenderer(options = { antialias: true }) {
  const renderer = new WebGLRenderer(options);

  // turn on the physically correct lighting model
  renderer.physicallyCorrectLights = true;
  return renderer;
}

export { createRenderer };
