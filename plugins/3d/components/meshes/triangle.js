import * as THREE from 'three';
import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from 'three';
function createTriangle({color = null} = {}) {
  // create a geometry
  const geometry = new THREE.ConeGeometry();

  // create a default (white) Basic material
  const material = new THREE.MeshStandardMaterial({color});

  // create a Mesh containing the geometry and material
  const triangle = new Mesh(geometry, material);

  return triangle;
}

export { createTriangle };
