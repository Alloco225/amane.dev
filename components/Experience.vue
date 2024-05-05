<template>
  <div>
    <div id="scene-container"></div>

    <div id="info" >Description</div>
    <div class="bg-blue-500 hidden">

      <button id="start-btn"  class="bg-pink-500 cursor-pointer p-4 m-5"  >Start experience</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Experience",

  methods: {
    start(){
      console.log("render");
    }
  }
};
</script>

<style>
#scene-container {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -10;
}

#info {
	position: absolute;
	top: 10px;
	width: 100%;
	text-align: center;
	z-index: 100;
	display:block;
}
</style>
