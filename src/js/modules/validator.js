const validator = (input) => {
    let errorBlock = input.nextElementSibling.dataset.validateError == '' ? input.nextElementSibling : false;

    function showErrorMessage(message) {
        if(errorBlock) {
            errorBlock.style.display = 'block';
            errorBlock.innerHTML = message;
        } else {
            console.log('error block must be after input!');
        }
    }

    function hideErrorMessage() {
        if(errorBlock) {
            errorBlock.style.display = 'none';
            errorBlock.innerHTML = '';
        } else {
            console.log('error block must be after input!');
        }
    }
    
    function inputMail(input) {
        let reg = /.+@.+\..+/i;

        if(reg.test(input.value)) {
            hideErrorMessage();
            return true;
        } else {
            showErrorMessage('Uncorrect email.');
            return false;
        }
    }

    function inputText(input) {
        if(input.value.length > 0 &&  input.value.length < 200) {
            hideErrorMessage();
            return true;
        } else {
            showErrorMessage('This field must include more than 0 and less than 200 symbol.');
            return false;
        }
    }

    function inputPhone(input) {
        let reg = /\+\d{12}/g;
        
        if(reg.test(input.value)) {
            hideErrorMessage();
            return true;
        } else {
            showErrorMessage('This field must include 12 digits.');
            return false;
        }
    }

    switch(input.getAttribute('type')) {
        case 'email':
            if(input.dataset.validate == '') {
                return inputMail(input);
            } else {
                return true;
            }
            break;
        case 'text':
            if(input.dataset.validate == '') {
                return inputText(input);
            } else {
                return true;
            }
            break;
        case 'tel':
            if(input.dataset.validate == '') {
                return inputPhone(input);
            } else {
                return true;
            }
            break;
        default: 
            return true;
    }
};

export default validator;