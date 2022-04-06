import request from "../services/request.js";
import {modalShow, modalHide} from '../modal.js';
import drawCartList from '../cart/drawCartList.js';
import validator from '../validator.js';

const form = () => {
    let forms = document.querySelectorAll('form'),
        valid = false,
        message = {
            loading: 'img/spinner.svg',
            success: "Your order has been placed successfully! Thank you for choosing us.",
            failure: "Oops, something wrong..."
        };

    function showThxModal(message) {
        let modalDilog = document.querySelector('.modal__dialog'),
            modalThx = document.createElement('div');

        modalDilog.classList.add('hide');

        modalThx.classList.add('modal__dialog');
        modalThx.innerHTML = `
                <div class="modal__content">
                    <div data-modal-close="" class="modal__close">×</div>
                    <div style="text-align:center; line-height:120%; margin-top:20px; font-size: 1.5rem">${message}</div>
                </div>
        `;
        document.querySelector('.modal').append(modalThx);
        
        modalShow('.modal');

        setTimeout(() => {
            modalThx.remove();
            modalDilog.classList.remove('hide');
            modalDilog.classList.add('show');
            modalHide('.modal');
        }, 5000);
    }

    function insertHiddenInputs(inputsSelector, formData) {
        let inputs = document.querySelectorAll(inputsSelector),
            products = [];

        inputs.forEach(item => {
            products.push({
                id: item.dataset.productId,
                title: item.dataset.productName,
                price: item.dataset.productPrice
            });
        });

        formData.append('products', JSON.stringify(products));

        return formData;
    }

    function bindForm(form) {
        let formData = new FormData(form),
            json = form.id == 'order-form' ? JSON.stringify(Object.fromEntries(insertHiddenInputs('input[data-product-id]', formData).entries())) :
                                             JSON.stringify(Object.fromEntries(formData.entries())),
            statusMessage = document.createElement('img');

        //if(!validator(form)) return;

        statusMessage.src = message.loading;
        statusMessage.classList.add('spinner');
        document.body.append(statusMessage);

        switch(form.id) {
            case 'order-form': {
                request({url: 'http://localhost:3000/orders', body: json, method: "POST"})
                .then(res => {
                    statusMessage.remove();
                    showThxModal(message.success);
                })
                .catch((e) => {
                    console.log(e);
                    statusMessage.remove();
                    showThxModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                    window.localStorage.removeItem('order');
                    drawCartList({
                        cartList: '.cart__list-wrap', 
                        emptyCartLayout: `
                        <li class="cart__item cart__empty">
                            <p>Cart is empty!</p>
                        </li>`
                    });
                });
            }
                break;
            case 'email-form': {
                request({url: 'http://localhost:3000/emails', body: json, method: "POST"})
                .then(res => {
                    statusMessage.remove();
                    showThxModal('Thank you! Our manager will contact you.');
                })
                .catch((e) => {
                    console.log(e);
                    statusMessage.remove();
                    showThxModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
            }
                break;
            case 'search-form': {
                statusMessage.remove();
            }
                break;
            default: {
                console.log('search');
            }
        }
    }



    forms.forEach(item => {
        item.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', (e) => {
                valid = validator(input);
            });
        });

        item.addEventListener('submit', (e) => {
            e.preventDefault();
            if (valid){
                bindForm(item);
            }
        });
    });
}

export default form;