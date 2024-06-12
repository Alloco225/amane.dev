const getCameraFeed = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  return stream;
};


export { getCameraFeed }
