function validateForm() {

    // form inputs
    const usernameInput = document.getElementById('username');
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const genderInput = document.getElementById('gender');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const dateInput = document.getElementById('creationDate')

    // form error inputs
    const errorUsername = document.getElementById('errorUsername');
    const errorName = document.getElementById('errorName');
    const errorSurname = document.getElementById('errorSurname');
    const errorGender = document.getElementById('errorGender');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');
    const errorDate = document.getElementById('errorCreationDate');
    let errorsSummary = document.getElementById('errorSummary');

    if (errorsSummary === null) {
        errorsSummary = "";
    }
    resetErrors([usernameInput, nameInput, surnameInput, genderInput, emailInput, passwordInput, dateInput],
                [errorUsername, errorName, errorSurname, errorGender, errorEmail, errorPassword, errorDate], errorsSummary);

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const reqLenMessage1 = document.getElementById('errorMessage-2-60').innerText;
    const reqLenMessage2 = document.getElementById('errorMessage-8').innerText;
    const reqLenMessage3 = document.getElementById('errorMessage-5-60').innerText;
    const reqEmail = document.getElementById('errorMessage-email').innerText;
    const reqDateFormat = document.getElementById('errorMessage-dateFormat').innerText;
    const reqDatePast = document.getElementById('errorMessage-datePast').innerText;

    let valid = true;

    if(!checkRequired(usernameInput.value)) {
        valid = false;
        usernameInput.classList.add("error-input");
        errorUsername.innerText = reqMessage;
    } else if (!checkTextLengthRange(usernameInput.value, 2, 60)) {
        valid = false;
        usernameInput.classList.add("error-input");
        errorUsername.innerText = reqLenMessage1;
    }

    if(!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = reqMessage;
    } else if (!checkTextLengthRange(nameInput.value, 2, 60)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = reqLenMessage1;
    }

    if(!checkRequired(surnameInput.value)) {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = reqMessage;
    } else if (!checkTextLengthRange(surnameInput.value, 2, 60)) {
        valid = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = reqLenMessage1;
    }

    if(!checkRequired(genderInput.value)) {
        valid = false;
        genderInput.classList.add("error-input");
        errorGender.innerText = reqMessage;
    } else if (!checkTextLengthRange(genderInput.value, 2, 60)) {
        valid = false;
        genderInput.classList.add("error-input");
        errorGender.innerText = reqLenMessage1;
    }

    if(!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage;
    } else if (!checkTextLengthRange(passwordInput.value, 8, 60)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqLenMessage2;
    }

    if(!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessage;
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqLenMessage3;
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input")
        errorEmail.innerText = reqEmail;
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if(month.length < 2)
        month = '0' + month;
    if(day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if(!checkRequired(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = reqMessage
    } else if (!checkDate(dateInput.value)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = reqDateFormat
    } else if (checkDateIfAfter(dateInput.value, nowString)) {
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = reqDatePast;
    }


    if(!valid) {
        errorsSummary.innerText = "Form contains errors!";
    }

    return valid;


}
