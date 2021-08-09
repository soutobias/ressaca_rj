import gifshot from 'gifshot';


const initGifshot = () => {

  const gif = document.getElementById("model-gif");


  if (gif) {

    const images = JSON.parse(gif.dataset.markers);

    gifshot.createGIF({
      'images': images.image
    },function(obj) {
      if(!obj.error) {
        var image = obj.image,
        animatedImage = document.createElement('img');
        animatedImage.crossOrigin = "Anonymous";
        animatedImage.src = image;
        document.body.appendChild(animatedImage);
        gif.innerHTML = animatedImage;
      }
    });
  }
};

export { initGifshot };

