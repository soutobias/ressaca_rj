const showModel = () => {

  const clickButton1 = document.getElementById("show-model");
  const images = document.getElementById("images-models");

  if (clickButton1) {
    clickButton1.addEventListener('click', (event) => {
      images.classList.toggle('inactive-tab');
      if (element.classList.contains('inactive-tab')) {
        clickButton1.value = 'MOSTRAR MODELOS DE PREVISÃO'
      } else {
        clickButton1.value = 'ESCONDER MODELOS DE PREVISÃO'
      }
    });
  }
};

export { showModel };
