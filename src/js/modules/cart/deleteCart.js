import drawCartList from './drawCartList.js';

const deleteCart = ({btn}) => {
    const del = document.querySelectorAll(btn);

    function deleteItemLocalStorage(id) {
        let storage = JSON.parse(window.localStorage.getItem('order')),
            storageNew = storage.filter(item => item.id !== id);

        window.localStorage.removeItem('order');

        window.localStorage.setItem('order', JSON.stringify(storageNew));

        //перерисовываем товары в корзине
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
            btnDelete: btn
        });

        //перерисовываем товары в модальном окне
        drawCartList({
            cartList: '.order tbody',
            emptyCartLayout: `
            <tr class="order__item">
                <td class="order__empty">Your cart is empty. Choose some product</td>
            </tr>`,
            cartLayout: (obj, i = 0) => {
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
    }

    function bindBtnDelete() {
        del.forEach(item => {
            item.addEventListener('click', (e) => {
                let target = e.target;
                deleteItemLocalStorage(target.parentElement.id);
            });
        });
    }
    
    bindBtnDelete();
};

export default deleteCart;