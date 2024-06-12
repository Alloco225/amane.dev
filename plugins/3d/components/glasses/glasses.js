import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModel } from './setupModel';

async function loadGlasses() {
  const loader = new GLTFLoader();

  const [roundedRectangleGlassesData] = await Promise.all([
    loader.loadAsync("/assets/models/rounded_rectangle_eyeglasses.glb"),
  ]);

  console.log('Glasses!', roundedRectangleGlassesData);

  const roundedRectangleGlasses = setupModel(roundedRectangleGlassesData);
  console.log("roundedRectangleGlasses", roundedRectangleGlasses)

  roundedRectangleGlasses.position.set(0, 0, 2.5);


  return { roundedRectangleGlasses}
}

export { loadGlasses };
