const showModel = () => {

  const clickButton1 = document.getElementById("show-model");
  const images = document.getElementById("images-models");

  if (clickButton1) {
    console.log('ok');
    clickButton1.addEventListener('click', (event) => {
      images.classList.toggle('inactive-tab');
      if (element.classList.contains('inactive-tab')) {
        clickButton1.textContent = 'MOSTRAR MODELOS DE PREVISÃO';
      } else {
        clickButton1.textContent = 'ESCONDER MODELOS DE PREVISÃO';
      }
    });
  }
};

export { showModel };
