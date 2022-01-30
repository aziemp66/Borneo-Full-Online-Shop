const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");

function getSignup(req, res) {
    res.render("customer/auth/signup");
}

async function signup(req, res, next) {
    if (
        !validation.userDetailsAreValid(
            req.body.email,
            req.body.password,
            req.body.fullname,
            req.body.street,
            req.body.postal,
            req.body.city
        ) ||
        validation.emailAndPasswordIsConfirmed(
            req.body.email,
            req.body["confirm-email"],
            req.body.password,
            req.body["confirm-password"]
        )
    ) {
        res.redirect("/signup");
        return;
    }

    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
    );

    try {
        const existAlready = await user.existAlready();

        if (existAlready) {
            res.redirect("/signup");
            return;
        }

        await user.signup();
    } catch (error) {
        return next(error);
    }

    res.redirect("/login");
}

function getLogin(req, res) {
    res.render("customer/auth/login");
}

async function login(req, res) {
    const user = new User(req.body.email, req.body.password);
    let existingUser;
    try {
        existingUser = await user.getUserWithSameEmail();
    } catch (error) {
        return next(error);
    }

    if (!existingUser) {
        res.redirect("/login");
        return;
    }

    const passwordIsCorrect = await user.hasMatchingPassword(
        existingUser.password
    );

    if (!passwordIsCorrect) {
        res.redirect("/login");
        return;
    }

    authUtil.createUserSession(req, existingUser, function () {
        res.redirect("/");
    });
}

function logout(req, res) {
    authUtil.destroyUserAuthSession(req);
    res.redirect("/login");
}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup,
    login: login,
    logout: logout,
};
