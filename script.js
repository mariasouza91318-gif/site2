document.addEventListener('DOMContentLoaded', () => {
  // 1. Carrossel de Banners
  const slides = document.querySelectorAll('.slide');
  const indicadores = document.querySelectorAll('.indicador');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');

  let slideAtual = 0;
  let intervaloCarrossel = null;

  function mostrarSlide(indice) {
    if (slides.length === 0) return;

    if (indice >= slides.length) {
      slideAtual = 0;
    } else if (indice < 0) {
      slideAtual = slides.length - 1;
    } else {
      slideAtual = indice;
    }

    slides.forEach((slide, i) => {
      slide.classList.toggle('ativo', i === slideAtual);
    });

    indicadores.forEach((indicador, i) => {
      indicador.classList.toggle('ativo', i === slideAtual);
    });
  }

  function iniciarAutoPlay() {
    clearInterval(intervaloCarrossel);
    intervaloCarrossel = setInterval(() => {
      mostrarSlide(slideAtual + 1);
    }, 5000);
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      mostrarSlide(slideAtual + 1);
      iniciarAutoPlay();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      mostrarSlide(slideAtual - 1);
      iniciarAutoPlay();
    });
  }

  indicadores.forEach((indicador) => {
    indicador.addEventListener('click', () => {
      const indice = Number(indicador.getAttribute('data-index'));
      mostrarSlide(indice);
      iniciarAutoPlay();
    });
  });

  iniciarAutoPlay();

  // 2. Botão "Ver detalhes" nos cards de vagas
  const botoesDetalhes = document.querySelectorAll('.btn-detalhes');

  botoesDetalhes.forEach((botao) => {
    botao.addEventListener('click', () => {
      const cardVaga = botao.closest('.card-vaga');
      const caixaDetalhes = cardVaga.querySelector('.vaga-detalhes');
      const estaOculto = caixaDetalhes.hasAttribute('hidden');

      if (estaOculto) {
        caixaDetalhes.removeAttribute('hidden');
        botao.textContent = 'Ocultar detalhes';
        botao.classList.add('aberto');
      } else {
        caixaDetalhes.setAttribute('hidden', '');
        botao.textContent = 'Ver detalhes';
        botao.classList.remove('aberto');
      }
    });
  });

  // 3. Destaque do link ativo no menu
  const linksMenu = document.querySelectorAll('.menu-principal a');

  linksMenu.forEach((link) => {
    link.addEventListener('click', () => {
      linksMenu.forEach((item) => item.classList.remove('ativo'));
      link.classList.add('ativo');
    });
  });
});