import { Color, DirectionalLight, PointLight, RectAreaLight, SpotLight } from 'three';

function createDirectionalLight({color = null, intensity = 1} ={}) {
  const light = new DirectionalLight(color, intensity); // TODO
  return light;
}

function createPointLight({color = null, intensity = 1, distance = null, decay = null} ={}) {
  const light = new PointLight(color, intensity, distance, decay); // TODO
  return light;
}

function createSpotLight({color = null, intensity = 1, distance = null, angle = null, penumbra = null, decay = null} ={}) {
  const light = new SpotLight(color, intensity, distance, angle, penumbra, decay); // TODO
  return light;
}

function createReactAreaLight({color = null, intensity = 1, width = 10, height = 10} ={}) {
  const light = new RectAreaLight(color, intensity, width, height); // TODO
  return light;
}

export { createDirectionalLight, createPointLight, createReactAreaLight, createSpotLight };
