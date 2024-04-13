<template>
  <div>
    <div id="scene-container"></div>
    <div id="info">Description</div>
  </div>
</template>

<script>
export default {
  name: "Portfolio",
};
</script>

<style>
#scene-container {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
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
