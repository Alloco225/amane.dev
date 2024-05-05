import {
  SphereBufferGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
} from 'three';

function createMeshGroup() {

  // a group holds other objects
  // but cannot be seen itself
  const group = new Group();

  const geometry = new SphereGeometry(0.25, 16, 16);

  const material = new MeshStandardMaterial({
    color: 'indigo',
  });

  const protoSphere = new Mesh(geometry, material);

  // add the sphere to the group
  group.add(protoSphere);


  // create twenty clones of the protoSphere
  // and add each to the group
  for (let i = 0; i < 1; i += 0.05) {
    const sphere = protoSphere.clone();
    const x = Math.cos(2 * Math.PI * i);
    const y = Math.sin(2 * Math.PI * i);

    sphere.position.x = x;
    sphere.position.y = y;
    sphere.position.z = -1 / .9

    sphere.scale.multiplyScalar(0.01 + i);


    group.add(sphere);
  }
  // group.scale.multiplyScalar(.5)

  group.tick = (delta) => {
    group.rotation.z += .5 * delta;
  };

  return group;
}

export { createMeshGroup };
