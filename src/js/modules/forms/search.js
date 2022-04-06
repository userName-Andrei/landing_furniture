import request from "../services/request.js";

const search = ({inputSelector, resultSelector, useLocalFile = true}) => {
    let inputs = document.querySelectorAll(inputSelector),
        resultList = document.querySelector(resultSelector),
        products;

    function setProducts() {
        if(useLocalFile) {
            request({url: 'products.json', method: "GET"})
            .then(res => {
                products = res.products;
            })
            .catch((e) => {
                console.log(e);
            });
        } else {
            request({url: 'http://localhost:3000/products', method: "GET"})
            .then(res => {
                products = res;
            })
            .catch((e) => {
                console.log(e);
            });
        }
    }

    function drawSearchResult(arr = null) {
        resultList.style.display = arr == null ? 'none' : 'block';
        resultList.innerHTML = '';

        if(arr == null) return;

        if(arr.length == 0) {
            resultList.innerHTML += `
                <li class="result-search__item">
                    Nothing found
                </li>`;

            return;
        }

        arr.forEach(item => {
            resultList.innerHTML += `
            <li class="result-search__item">
                <a href="${item.url}">${item.title}</a>
            </li>`;
        });
        
    }

    function bintInputs() {
        inputs.forEach(item => {
            item.addEventListener('input', (e) => {
                e.preventDefault();
                let res = [];
    
                if(e.target.value !== '') {
                    try{
                        products.forEach(i => {
                            if(i.title.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1) {
                                res.push(i);
                            } else {
                                drawSearchResult(res);
                            }
                        });
                    } catch(e) {
                        throw new Error(e);
                    }

                    drawSearchResult(res);

                } else {
                    drawSearchResult();
                }
                
            });
            item.addEventListener('blur', () => resultList.style.display = 'none');
        });
    }

    setProducts();
    bintInputs();
}

export default search;