import accordion from "./accordion.js";

const menu = () => {
    let header = document.querySelector('.header'),
        wrap = header.querySelector('.header__wrap'),
        search = wrap.querySelector('.search__body'),
        btnSearchCall = wrap.querySelector('.search__btn-call'),
        burger = wrap.querySelector('.burger-btn'),
        burgerMenu = wrap.querySelector('.menu'),
        menuIcon = wrap.querySelectorAll('.menu__icon'),
        favorite = wrap.querySelector('.favorite__icon'),
        cartIcon = wrap.querySelector('.cart');

    document.addEventListener('click', (e) => {
        if(e.target) {
            if(document.body.classList.contains('mobile')) {
                if(e.target.classList.contains('search__btn-call')) {
                    search.classList.toggle('active');
                    btnSearchCall.classList.toggle('active');
                }
                if(e.target.classList.contains('cart__icon')) {
                    cartIcon.classList.toggle('active');
                } else {
                    cartIcon.classList.remove('active');
                }
                if(e.target.classList.contains('menu__icon')) {
                    menuIcon.forEach(item => {
                        if(e.target == item) {
                            item.closest('.menu__item').classList.toggle('active');
                        }
                    });
                }
                accordion({inner: '.menu__submenu', wrapper: '.menu__icon'});
            }
            if(e.target.classList.contains('burger-btn') || e.target.closest('.burger-btn')) {
                burger.classList.toggle('active');
                burgerMenu.classList.toggle('active');
            }
            if(e.target.classList.contains('favorite__icon')) {
                favorite.classList.toggle('active');
                if(favorite.classList.contains('active')) {
                    favorite.setAttribute('data-favorite', true);
                } else {
                    favorite.removeAttribute('data-favorite');
                }
            }
        }
    });

    window.addEventListener('scroll', () => {
        if(scrollY > 10) {
            document.querySelector('.header__wrap').style.backgroundColor = 'rgba(224, 217, 207, 0.8)';
        } else {
            document.querySelector('.header__wrap').style.backgroundColor = 'rgba(224, 217, 207, 0.0)';
        }
    });
}

export default menu;