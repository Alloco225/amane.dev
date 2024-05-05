import * as THREE from 'three';
import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from 'three';
function createDonut({ color = null } = {}) {
  // create a geometry
  const geometry = new THREE.TorusGeometry();

  // create a default (white) Basic material
  const material = new THREE.MeshStandardMaterial({color});
  // const material = new THREE.MeshStandardMaterial();
  // const material = new THREE.MeshToonMaterial({color});

  // create a Mesh containing the geometry and material
  const donut = new Mesh(geometry, material);

  const degresPerSecondInRad = THREE.MathUtils.degToRad(20)
  const colorChangePerSecond = 0.1;

  let newColor = new THREE.Vector3(0, 0, 0);

  donut.tick = (delta) => {
    // newColor.x += (colorChangePerSecond * delta - Math.random());
    // newColor.y += (colorChangePerSecond * delta - Math.random());
    // newColor.z += (colorChangePerSecond * delta - Math.random());
    newColor.x += Math.random() * colorChangePerSecond;
    newColor.y += Math.random() * colorChangePerSecond;
    newColor.z += Math.random() * colorChangePerSecond;

    if(newColor.x > 255){
      newColor.x = 0;
    }
    if(newColor.y > 255){
      newColor.y = 0;
    }
    if(newColor.z > 255){
      newColor.z = 0;
    }

    donut.rotation.y += degresPerSecondInRad * delta;

    // donut.material.color = new THREE.Color(newColor.x, newColor.y, newColor.z)
  }

  return donut;
}

export { createDonut };
