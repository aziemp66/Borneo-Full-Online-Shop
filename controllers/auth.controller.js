function getSignup(req, res) {
    res.render("customer/auth/signup");
}

function getLogin(req, res) {
    //..
}

function signup(req, res) {
    const email = req.body.email;
}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup,
};
