import { World } from './World/World.js';

let world;

async function main() {
  console.log("main");

  // Get a reference to the container element
  const container = document.querySelector('#scene-container');

  // 1. Create an instance of the World app
  world = new World(container);


  /*
  // produce a single frame (render on demand)
  world.render();
  */

  // complete async tasks
  await world.init();

  // start the loop (produce a stream of frames)
  world.start();

  //

  setUpEventListeners();
}


function setUpEventListeners(){

  let button = document.querySelector('#start-btn')
  button?.addEventListener('click', launchRender)

  document.querySelector('#focusNext-btn').addEventListener('click', focusNext)
}

function launchRender(){

  console.log("clicked start");
  // main();
}

function focusNext(){
  console.log("focusNext")
  world.focusNext();
}

main().catch((err) => {
  console.error('xx main', err);
});


// export default { main }
