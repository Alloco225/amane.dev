import * as THREE from 'three';
import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from 'three';
function createDonut() {
  // create a geometry
  const geometry = new THREE.TorusGeometry();

  // create a default (white) Basic material
  const material = new MeshBasicMaterial();

  // create a Mesh containing the geometry and material
  const donut = new Mesh(geometry, material);

  return donut;
}

export { createDonut };
