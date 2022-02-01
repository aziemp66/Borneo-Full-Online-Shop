const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignup(req, res) {
    res.render("customer/auth/signup");
}

async function signup(req, res, next) {
    const enteredData = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.fullname,
        street: req.body.street,
        postal: req.body.postal,
        city: req.body.city,
    };
    if (
        !validation.userDetailsAreValid(...enteredData) ||
        validation.emailAndPasswordIsConfirmed(
            req.body.email,
            req.body["confirm-email"],
            req.body.password,
            req.body["confirm-password"]
        )
    ) {
        sessionFlash.flashDataToSession(
            req,
            {
                errorMessage: "Please check your input for invalid data",
                ...enteredData,
            },
            function () {
                res.redirect("/signup");
            }
        );
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
            sessionFlash.flashDataToSession(req, {
                errorMessage: "User Already Exist, Try logging in instead",
                ...enteredData,
                function() {
                    res.redirect("/signup");
                },
            });
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
    const enteredData = {
        email: req.body.email,
        password: req.body.password,
    };
    const user = new User(req.body.email, req.body.password);
    let existingUser;
    try {
        existingUser = await user.getUserWithSameEmail();
    } catch (error) {
        return next(error);
    }

    const sessionErrorData = {
        errorMessage:
            "Invalid Credentials - please double-check your email and password!",
        ...enteredData,
    };

    if (!existingUser) {
        sessionFlash.flashDataToSession(req, ...sessionErrorData, function () {
            res.redirect("/login");
        });

        return;
    }

    const passwordIsCorrect = await user.hasMatchingPassword(
        existingUser.password
    );

    if (!passwordIsCorrect) {
        sessionFlash.flashDataToSession(req, ...sessionErrorData, function () {
            res.redirect("/login");
        });
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
