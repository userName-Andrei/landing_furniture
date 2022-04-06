import {modalShow, modalHide} from './modal.js';

const gallery = ({body}) => {
    let galleryBody = document.querySelector(body),
        galleryItems = galleryBody.querySelectorAll('[data-gallery]'),
        modal = document.querySelector('.modal');

    function movingGallery() {
        let galleryWidth = galleryBody.offsetWidth,
            galleryColumn = document.querySelectorAll('.gallery__col'),
            speed = 0.05,
            positionX = 0,
            coordXpercent = 0;

        function setGalleryMove() {
            let itemsWidth = 0;
            galleryColumn.forEach(item => itemsWidth += item.offsetWidth);

            let differentWidth = itemsWidth - galleryWidth;
            let distX = Math.floor(coordXpercent - positionX);

            positionX = positionX + (distX * speed);
            let pos = differentWidth / 200 * positionX;

            galleryBody.style.cssText = `transform: translate3d( ${-pos}px, 0px, 0px)`;

            if(Math.abs(distX) > 0) {
                requestAnimationFrame(setGalleryMove);
            } else {
                galleryBody.classList.remove('init');
            }
        }

        galleryBody.addEventListener('mousemove', (e) => {
            let mouseCoord = e.pageX - galleryWidth / 2;

            coordXpercent = mouseCoord / galleryWidth * 200;

            if(!galleryBody.classList.contains('init')) {
                requestAnimationFrame(setGalleryMove);
                galleryBody.classList.add('init');
            }
        });
    }

    function openGalleryItem(path,modal) {
        let modalDialog = document.querySelector('.modal__dialog'),
            modalGallery = document.createElement('div');

        modalDialog.classList.add('hide');

        modalGallery.classList.add('modal__dialog');
        modalGallery.style.cssText = 'margin: 0px; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); max-width: 80vw';
        modalGallery.innerHTML = `
                    <img src="${path}" alt="image" style="width: 100%; height: 100%;">
        `;
        modal.append(modalGallery);
        
        modalShow('.modal');

        return {modalDialog, modalGallery};
    }

    function closeGalleryItem(modalDialog, modalGallery, modal) {
        
        modal.addEventListener('click', (e) => {
            if(e.target.classList.contains('modal')) {
                modalGallery.remove();
                modalDialog.classList.remove('hide');
                modalHide('.modal');
            }
        });
    }

    function runGallery() {
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
    
                let path = item.href;
                
                if(e.target) {
                    
                    let mod = openGalleryItem(path, modal);
    
                    closeGalleryItem(mod.modalDialog, mod.modalGallery, modal);
                }
            });
        });
    }

    runGallery();
    movingGallery();
};

export default gallery;