const accordion = ({inner, wrapper}) => {
    let panel = document.querySelectorAll(inner),
        trigger = document.querySelectorAll(wrapper);

        trigger.forEach((item, i) => {
            item.addEventListener('click', (e) => {
                if(e.target == item) {
                    if(!item.parentElement.classList.contains('active')){
                        panel[i].style.height = panel[i].scrollHeight + 15 + 'px';
                    } else {
                        panel[i].style.height = 0 + 'px';
                    }
                }
            });
        });
}

export default accordion;