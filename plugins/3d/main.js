import { World } from './World/World.js';

function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');

  // 1. Create an instance of the World app
  const world = new World(container);

  // 2. Render the scene
  world.render();
}


let button = document.querySelector('#start-btn')
button.addEventListener('click', launchRender)

function launchRender(){

  console.log("clicked start");
  // main();
}

main()


// export default { main }
