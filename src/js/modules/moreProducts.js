import request from './services/request.js';
import addToCart from './cart/addToCart.js';

const moreProducts = ({trigger, wrapper, output, url = 'products.json'}) => {
    let btn = document.querySelector(trigger),
        list = document.querySelector(wrapper),
        onPage = [],    //id продуктов на странице
        firstRequest = true;

    function setUrlForRequest(url, out) {
        //формирование url для запроса к серверу

        let urlProducts = url + "?",
            lastProductNum = 0;

        if(url == 'products.json') {
            return 'products.json';
        }
            
        if(onPage.length == 0) {
            for(let i = 1; i <= out; i++) {
                urlProducts += `id=${i}&`;
            }
            urlProducts = urlProducts.substring(0, urlProducts.length-1);
        } else {
            lastProductNum = onPage.length;
            for(let i = 1; i <= out; i++) {
                urlProducts += `id=${lastProductNum + i}&`;
            }
            urlProducts = urlProducts.substring(0, urlProducts.length-1);
        }

        return urlProducts;
    }

    function drawProducts(item) {
        let label = '';

        if(item.labels.length !== 0) {
            item.labels.forEach(elem => {
                label += `<div class="label" data-label="${elem.type}">${elem.value}</div>`;
            });
        } 
        list.innerHTML += `
        <div class="list-product__item" id="${item.id}">
            <div class="list-product__image">
                <img src="img/products/${item.image}" alt="products">
            </div>
            <div class="list-product__labels">${label}</div>
            <div class="list-product__text text-product">
                <div class="text-product__title">${item.title}</div>
                <div class="text-product__subtitle">${item.text}</div>
                <div class="text-product__price">
                    <div class="text-product__newprice">Rp. ${item.price}</div>
                    <div class="text-product__oldprice">${item.priceOld}</div>
                </div>
            </div>
            <div class="list-product__hover hover-product">
                <div class="hover-product__body">
                    <button type="button" class="hover-product__btn btn">Add to cart</button>
                    <a href="" class="hover-product__link _icon-share">Share</a>
                    <a href="" class="hover-product__link _icon-favorite">Like</a>
                </div>
            </div>
        </div>
        `;
    }

    function getProducts(out = 4) {

        //запрос к серверу
        request({url: setUrlForRequest(url, out), method: 'GET'})
            .then(res => {

                //отключение заглушек
                if(firstRequest) {
                    list.innerHTML = '';
                    firstRequest = false;
                }

                if(url !== 'products.json') {
                    if(res.length == 0) {
                        btn.disabled = true;
                    } else {

                        btn.disabled = false;

                        res.forEach((item) => {
                            onPage.push(item.id);
    
                            drawProducts(item);
                        });
                    }
                } else {
                    if(onPage.length == res.products.length) {
                        btn.disabled = true;
                    } else {
                        btn.disabled = false;

                        for(let i = onPage.length, h = onPage.length; i < res.products.length; i++) {
                            if(i == h + output) break;
                            onPage.push(res.products[i].id);
                            drawProducts(res.products[i]);
                        }
                    }
                }

                addToCart({addBtns: '.hover-product__btn'});
            })
            .catch((e) => {
                console.log(e);
            });
    }

    function bindBtnShowMore() {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
    
            btn.disabled = true;
            getProducts(output);
        });  
    }


    getProducts(output);
    bindBtnShowMore();
};

export default moreProducts;