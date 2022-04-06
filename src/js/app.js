import menu from './modules/menu.js';
import slider from './modules/slider.js';
import moreProducts from './modules/moreProducts.js';
import drawCartList from './modules/cart/drawCartList.js';
import {modal} from './modules/modal.js';
import form from './modules/forms/form.js';
import gallery from './modules/gallery.js';
import search from './modules/forms/search.js';
import addToCart from './modules/cart/addToCart.js';

window.addEventListener('DOMContentLoaded', () => {
    //проверка на мобильные устройства
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.screen.width < 768) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.add('desktop');
    }

    try{menu();} catch(e) {throw e;}
    try{
        slider({
            slidesPerView: 1, 
            body:'.slider__track', 
            controls: '.controls-slider__dots', 
            btnNext: '.first-slider .slider-arrows__next', 
            btnPrev: '.first-slider .slider-arrows__prev', 
            gap: 32
        });
    } catch(e) {throw e;}
    try{
        moreProducts({
            trigger: '.products__btn', 
            wrapper: '.products__list', 
            output: 4, 
            url: 'products.json' // 'http://localhost:3000/products'
        });
    } catch(e){throw e;}
    try{
        drawCartList({
            cartList: '.cart__list-wrap', 
            emptyCartLayout: `
            <li class="cart__item cart__empty">
                <p>Cart is empty!</p>
            </li>`,
            cartLayout: (obj, i = 0) => {
                return `
                <li class="cart__item" id="${obj.id}">
                    <p data-cart-list-number>${i+1}</p>
                    <p data-cart-name>${obj.title}</p>
                    <p data-cart-price>${obj.price}</p>
                    <span class="cart__delete">&#10006;</span>
                </li>`;
            },
            btnDelete: '.cart__delete'
        });
    } catch(e) {throw e;}
    try{modal({triggerSelector: '.popup', modalSelector: '.modal'});} catch(e){throw e;}
    try{form();} catch(e) {throw e;}
    try{
        slider({
            slidesPerView: 'auto', 
            body:'.slider-inspirations__track', 
            controls: '.controls-inspirations__dots', 
            btnPrev: '.slider-inspirations .slider-arrows__prev', 
            btnNext: '.slider-inspirations .slider-arrows__next', 
            gap: 24
        });
    } catch(e) {throw e;}
    try{
        slider({
            slidesPerView: 3, 
            body:'.slider-tip__track', 
            controls: '.tip-controls__dots', 
            btnPrev: '.tip-controls__arrow .slider-arrows__prev', 
            btnNext: '.tip-controls__arrow .slider-arrows__next', 
            gap: 32,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                500: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                }
            }
        });
    } catch(e) {throw e;}
    try{gallery({body: '.gallery__body'});} catch(e) {throw e;}
    try{
        search({
            inputSelector: '.search__form-input', 
            resultSelector: '.result-search',
        });
    } catch(e) {throw e;}

    addToCart({addBtns: '.hover-product__btn'});
});
