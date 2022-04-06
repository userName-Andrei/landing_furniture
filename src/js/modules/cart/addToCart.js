import drawCartList from './drawCartList.js';


const addToCart = ({addBtns}) => {
    let btnsAdd = document.querySelectorAll(addBtns);

    function fillingLocalStorage(trigger, productSelector) {
        let productHtml = trigger.closest(productSelector),
            productObj = {};

            productObj.id = productHtml.id;
            productObj.title = productHtml.querySelector('.text-product__title').textContent;
            productObj.price = productHtml.querySelector('.text-product__newprice').textContent;

            addLocalStorage(productObj);
    }

    function addLocalStorage (obj) {
        if(window.localStorage.getItem('order')){

            //убираем повторения в localStorage
            let storage = JSON.parse(window.localStorage.getItem('order')),
                storageNew = storage.filter(item => item.id !== obj.id);

            window.localStorage.removeItem('order');

            window.localStorage.setItem('order', JSON.stringify([...storageNew, obj]));
        } else {
            window.localStorage.setItem('order', JSON.stringify([obj]));
        }
    }

    function bindBtnAddToCart() {
        btnsAdd.forEach((item) => {
            item.addEventListener('click', () => {
                fillingLocalStorage(item, '.list-product__item');
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
            });
        });
    }

    bindBtnAddToCart();
}

export default addToCart;