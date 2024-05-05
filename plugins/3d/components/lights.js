import { AmbientLight, Color, DirectionalLight, HemisphereLight, PointLight, RectAreaLight, SpotLight } from 'three';

// Direct lights
function createDirectionalLight({color = null, intensity = 1} ={}) {
  const light = new DirectionalLight(color, intensity);
  return light;
}


function createPointLight({color = null, intensity = 1, distance = null, decay = null} ={}) {
  const light = new PointLight(color, intensity, distance, decay);
  return light;
}

function createSpotLight({color = null, intensity = 1, distance = null, angle = null, penumbra = null, decay = null} ={}) {
  const light = new SpotLight(color, intensity, distance, angle, penumbra, decay);
  return light;
}

function createReactAreaLight({color = null, intensity = 1, width = 10, height = 10} ={}) {
  const light = new RectAreaLight(color, intensity, width, height);
  return light;
}


// Indirect lights


function createHemisphereLight({ skyColor = null, groundColor = null, intensity = 1 } = {}) {
  const light = new HemisphereLight(skyColor, groundColor, intensity);
  return light;
}

function createAmbientLight({ color = null, intensity = 1 } = {}) {
  const light = new AmbientLight(color, intensity);
  return light;
}
//

export { createDirectionalLight, createPointLight, createReactAreaLight, createSpotLight, createHemisphereLight, };
