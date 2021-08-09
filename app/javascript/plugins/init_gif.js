
const initGif = () => {

  const gif = document.getElementById("model-gif");

  if (gif) {

    const images = JSON.parse(gif.dataset.markers);
    const imageClass = document.querySelectorAll("hide-images");

    let i = 0;
    let maxLoop = 10000;
    const delayTime = 1000;

    while (i < maxLoop) {
      imageClass.forEach((image) => {
        setTimeout(function () {
          image.classList.remove('hide-images');
        }, delayTime);
        image.classList.add('hide-images');
      });
    };
  };
};

export { initGif };
