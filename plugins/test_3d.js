import * as THREE from 'three';
// import WebGL from 'three/addons/capabilities/WebGL.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
try {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  // Lights

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(pointLight, ambientLight);

  const light = new THREE.AmbientLight(0xfff040); // soft white light
  // scene.add(light);

  renderer.render(scene, camera);

  const loader = new GLTFLoader();

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('draco/');
  loader.setDRACOLoader(dracoLoader);

  loader.load('/assets/models/Man/Man7.glb', function (gltf) {
    console.log("loaded gltf");
    scene.add(gltf.scene);

  }, undefined, function (error) {

    console.error(error);

  });



  function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
  }


  Array(200).fill().forEach(addStar);

  // Background

  const spaceTexture = new THREE.TextureLoader().load('/assets/space.jpg');
  scene.background = spaceTexture;

  // Avatar

  const jeffTexture = new THREE.TextureLoader().load('/assets/space.jpg');

  const jeff = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshBasicMaterial({ map: jeffTexture }));

  // scene.add(jeff);


  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = -1
  scene.add(cube);


  const pmaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
  const points = [];
  points.push(new THREE.Vector3(-5, 0, 0));
  points.push(new THREE.Vector3(0, 5, 0));
  points.push(new THREE.Vector3(5, 0, 0));

  const pgeometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(pgeometry, pmaterial);
  line.position.x = -1
  line.position.y = -1
  scene.add(line)

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);

    // camera.position.z += 0.2
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    jeff.rotation.x += 0.01;
    jeff.rotation.y += 0.01;

    renderer.render(scene, camera);
  }



  // if (WebGL.isWebGLAvailable()) {

  //   // Initiate function or other initializations here
  //   animate();

  // } else {

  //   const warning = WebGL.getWebGLErrorMessage();
  //   document.getElementById('container').appendChild(warning);

  // }
  animate();
} catch (error) {
  console.log("error", error);
}

console.log("3js test")
