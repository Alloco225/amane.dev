import * as THREE from 'three';
import { BoxBufferGeometry, Mesh, MeshBasicMaterial, SphereBufferGeometry } from 'three';



function createSphereBuffer({ radius = .12,  } = {}) {
  // create a geometry
  const sphereGeometry = new THREE.SphereGeometry(.12, 2, 2);

  var geometry = new THREE.BufferGeometry();
  var geometry = new THREE.SphereGeometry(radius);

  // create a default (white) Basic material
  const material = new THREE.MeshStandardMaterial()

  // create a Mesh containing the geometry and material
  const sphere = new Mesh(geometry, material);

  return sphere;
}

export { createSphereBuffer };
