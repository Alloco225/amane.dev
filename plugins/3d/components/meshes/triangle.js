import * as THREE from 'three';
import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from 'three';
function createTriangle() {
  // create a geometry
  const geometry = new THREE.ConeGeometry();

  // create a default (white) Basic material
  const material = new MeshBasicMaterial();

  // create a Mesh containing the geometry and material
  const triangle = new Mesh(geometry, material);

  return triangle;
}

export { createTriangle };
