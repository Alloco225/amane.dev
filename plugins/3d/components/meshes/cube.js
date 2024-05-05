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


  const radiansPerSecond = THREE.MathUtils.degToRad(30)

  let distancePerSecond = new THREE.Vector2(4, 1);

  cube.tick = (delta) =>{
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
    cube.rotation.z += radiansPerSecond * delta;

    cube.position.x += distancePerSecond.x * delta;
    cube.position.y += distancePerSecond.y * delta;

    if(Math.abs(cube.position.x) >= 4){
      distancePerSecond.x *= -1;
    }
    if(Math.abs(cube.position.y) >= 3){
      distancePerSecond.y *= -1;
    }
  }

  return cube;
}

export { createCube };
