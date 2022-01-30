function isEmpty(value) {
    return !value || value.trim() === "";
}

function userCredentialsAreValid(email, password) {
    return email && email.includes("@") && password.trim().length > 5;
}

function userDetailsAreValid(email, password, name, street, postal, city) {
    return (
        userCredentialsAreValid(email, password) &&
        !isEmpty(name) &&
        !isEmpty(street) &&
        !isEmpty(postal) &&
        !isEmpty(city)
    );
}

function emailAndPasswordIsConfirmed(
    email,
    confirmEmail,
    password,
    confirmPassword
) {
    return email === confirmEmail && password === confirmPassword;
}

module.exports = {
    userDetailsAreValid,
    emailAndPasswordIsConfirmed,
};
