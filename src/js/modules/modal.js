import drawCartList from "./cart/drawCartList.js";

const modalShow = (modalSelector) => {
    let modal = document.querySelector(modalSelector);

    let ident = window.innerWidth - document.documentElement.clientWidth;
	document.body.style.overflow = 'hidden';
	document.body.style.paddingRight = ident + 'px';
    document.querySelector('.header__wrap').style.paddingRight = ident + 'px';      //если меню фиксированное

    modal.classList.add('show');

    if(modal.classList.contains('hide')) {
        modal.classList.remove('hide');
    }

    drawCartList({
        cartList: '.order tbody',
        emptyCartLayout: `
        <tr class="order__item">
            <td class="order__empty">Your cart is empty. Choose some product</td>
        </tr>`,
        cartLayout: (obj = {}, i = 0) => {
            let str = `
            <tr class="order__item" id="${obj.id}">
                <td class="order__number">${i+1}</td>
                <td class="order__name">${obj.title}</td>
                <td class="order__price">${obj.price}</td>
                <td class="order__delete">&times;</td>
                <input type="hidden" data-product-id="${obj.id}" data-product-name="${obj.title}" data-product-price="${obj.price}">
            </tr>`;
            return str;
        },
        btnDelete: '.order__delete'
    });

    if(JSON.parse(window.localStorage.getItem('order')) == null || JSON.parse(window.localStorage.getItem('order')).length == 0) {
        document.querySelector('.modal__btn').disabled = true;
    } else {
        document.querySelector('.modal__btn').disabled = false;
    }
};

const modalHide = (modalSelector) => {
    let modal = document.querySelector(modalSelector);

    document.body.style.overflow = '';
	document.body.style.paddingRight = 0 + 'px';
    document.querySelector('.header__wrap').style.paddingRight = 0 + 'px';          //если меню фиксированное
    
    if(modal.classList.contains('show')) {
        modal.classList.remove('show');
        modal.classList.add('hide');
    } 
};

const modal = ({triggerSelector, modalSelector}) => {
    let modalItem = document.querySelector(modalSelector),
        btnOpen = document.querySelectorAll(triggerSelector);

    btnOpen.forEach(item => item.addEventListener('click', () => modalShow(modalSelector)));

    modalItem.addEventListener('click', (e) => {
        if(e.target.classList.contains('modal__close') || e.target === modalItem) {
            modalHide(modalSelector);
        }
    });
};

export {modal, modalShow, modalHide};