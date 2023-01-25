function validateForm() {

    //form inputs
    const recUsernameInput = document.getElementById('acc_id');
    const companyRecNameInput = document.getElementById('job_id');
    const statusInput = document.getElementById('status');
    const dateOpenedInput = document.getElementById('dateOpened');
    const notesInput = document.getElementById('notes');

    //form errors
    const errorRecUsername = document.getElementById('errorAccId');
    const errorCompanyRecName = document.getElementById('errorJobId');
    const errorStatus = document.getElementById('errorStatus');
    const errorDateOpened = document.getElementById('errorDateOpened');
    const errorNotes = document.getElementById('errorNotes');
    let errorsSummary = document.getElementById('errorSummary');

    if (errorsSummary === null) {
        errorsSummary = "";
    }

    resetErrors([recUsernameInput, companyRecNameInput, statusInput, dateOpenedInput, notesInput],
        [errorRecUsername, errorCompanyRecName, errorStatus, errorStatus, errorDateOpened, errorNotes], errorsSummary)

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const reqLenMessage = document.getElementById('errorMessage-2-60').innerText;
    const reqDateFormat = document.getElementById('errorMessage-dateFormat').innerText;
    const reqDatePast = document.getElementById('errorMessage-datePast').innerText;

    let valid = true;

    if(!checkRequired(recUsernameInput.value)) {
        valid = false;
        recUsernameInput.classList.add("error-input");
        errorRecUsername.innerText = reqMessage;
    } if(recUsernameInput.value === "0") {
        valid = false;
        recUsernameInput.classList.add("error-input");
        errorRecUsername.innerText = reqMessage;
    }

    if(!checkRequired(companyRecNameInput.value)) {
        valid = false;
        companyRecNameInput.classList.add("error-input");
        errorCompanyRecName.innerText = reqMessage;
    } else if(companyRecNameInput.value === "0") {
        valid = false;
        companyRecNameInput.classList.add("error-input");
        errorCompanyRecName.innerText = reqMessage;
    }

    if(!checkRequired(statusInput.value)) {
        valid = false;
        statusInput.classList.add("error-input");
        errorStatus.innerText = reqMessage;
    }
    else if (!checkTextLengthRange(statusInput.value, 2, 60)) {
        valid = false;
        statusInput.classList.add("error-input");
        errorStatus.innerText = reqLenMessage;
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

    if(!checkRequired(dateOpenedInput.value)) {
        valid = false;
        dateOpenedInput.classList.add("error-input");
        errorDateOpened.innerText = reqMessage
    } else if (!checkDate(dateOpenedInput.value)) {
        valid = false;
        dateOpenedInput.classList.add("error-input");
        errorDateOpened.innerText = reqDateFormat
    } else if (checkDateIfAfter(dateOpenedInput.value, nowString)) {
        valid = false;
        dateOpenedInput.classList.add("error-input");
        errorDateOpened.innerText = reqDatePast;
    }

    if(!valid) {
        errorsSummary.innerText = "Form contains errors";
    }

    return valid;
}
