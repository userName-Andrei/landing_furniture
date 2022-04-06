import Swiper, { Navigation, Pagination, Parallax } from 'swiper';

const slider = ({body, controls, btnPrev, btnNext, gap, slidesPerView, breakpoints}) => {
    let sliders = document.querySelectorAll('.slider-swiper');
    if(sliders){
      for(let i = 0; i < sliders.length; i++) {
        let slider = sliders[i];
        if(!slider.classList.contains('swiper-bild')) {
          let sliderItems = slider.children;
          if(sliderItems) {
            for(let index = 0; index < sliderItems.length; index++) {
              let slide = sliderItems[index];
              slide.classList.add('swiper-slide');
            }
          }
          let sliderContent = slider.innerHTML;
          let sliderWrapper = document.createElement('div');
          sliderWrapper.classList.add('swiper-wrapper');
          sliderWrapper.innerHTML = sliderContent;
          slider.innerHTML = '';
          slider.appendChild(sliderWrapper);
          slider.classList.add('swiper-bild');
        }
      }
    }

    new Swiper(body, {
      slidesPerView: slidesPerView,
      spaceBetween: gap,
      speed: 800,
      loop: true,
      loopAdditionalSlides: 3,
      parallax: true,
      modules: [Navigation, Pagination, Parallax],

      pagination: {
        el: controls,
        clickable: true,
      },

      navigation: {
        nextEl: btnNext,
        prevEl: btnPrev,
      },

      breakpoints: breakpoints,
    });
};

export default slider;