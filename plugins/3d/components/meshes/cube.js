import * as THREE from 'three';
import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from 'three';
function createCube({ color = null } = {}) {
  // create a geometry
  const geometry = new THREE.BoxGeometry(2, 2, 2);

  // create a default (white) Basic material
  // const material = new MeshBasicMaterial();
  const material = new THREE.MeshStandardMaterial({color});

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);

  return cube;
}

export { createCube };
