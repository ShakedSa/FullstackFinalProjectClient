const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export const validateEmail = (email) => {
    if (stringNullOrEmpty(email)) {
        return false;
    }
    return email.match(emailRegex);
}

export const validatePassword = (password) => {
    if (stringNullOrEmpty(password)) {
        return false;
    }
    if (password.length < 6) {
        return false;
    }
    let amountOfUppers = 0;
    let amountOfLowers = 0;
    let amountOfNumbers = 0;
    let amountOfSpecial = 0;
    for (let i = 0; i < password.length; i++) {
        if (password.charAt(i) >= 'a' && password.charAt(i) <= 'z') {
            amountOfLowers++;
        } else if (password.charAt(i) >= 'A' && password.charAt(i) <= 'Z') {
            amountOfUppers++;
        } else if (password.charAt(i) >= '0' && password.charAt(i) <= '9') {
            amountOfNumbers++;
        } else {
            amountOfSpecial++;
        }
    }
    if (amountOfLowers === 0 || amountOfUppers === 0 || amountOfNumbers === 0 || amountOfSpecial === 0) {
        return false;
    }
    return true;
}

export const stringNullOrEmpty = (str) => {
    return str === null || str === undefined || str === "";
}