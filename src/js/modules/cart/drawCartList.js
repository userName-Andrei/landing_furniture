import deleteCart from './deleteCart.js';

const drawCartList = ({
    cartList,  //принимает селектор корзины или иного элемента для заполнения выбранными продуктами
    emptyCartLayout,    //принимает строку верстку как будет выглядеть пустая корзина
    cartLayout,  //принимает функция аргументами которой будет (элемент localStorage, порядковый номер), должна возвращать строку с версткой элементов корзины
    btnDelete //принимает селектор кнопки удаления
    }) => {
    let number = document.querySelector('.cart__icon'),
        list = document.querySelector(cartList);

    if(JSON.parse(window.localStorage.getItem('order')) == null || JSON.parse(window.localStorage.getItem('order')).length == 0) {
        list.innerHTML = emptyCartLayout;
        
        // `
        // <li class="cart__item cart__empty">
        //     <p>Cart is empty!</p>
        // </li>`;
        number.innerHTML = '';
    } else {
        let storage = JSON.parse(window.localStorage.getItem('order'));

        list.innerHTML = '';

        number.innerHTML = `<span>${storage.length}</span>`;
        storage.forEach((item, i) => {
            list.innerHTML += cartLayout(item, i);
            
            // `
            // <li class="cart__item" id="${item.id}">
            //     <p data-cart-list-number>${i+1}</p>
            //     <p data-cart-name>${item.title}</p>
            //     <p data-cart-price>Rp. ${item.price}</p>
            //     <span class="cart__delete">&#10006;</span>
            // </li>
            // `;
        });
        deleteCart({btn: btnDelete});
    }
};

export default drawCartList;