function checkAuthStatus(req, res, next) {
    const uid = req.session.uid;

    if (!uid) {
        return next();
    }

    res.locals.uid = uid;
    res.locals.isAdmin = req.session.isAdmin;
    res.locals.isAuth = true;
    next();
}

module.exports = checkAuthStatus;
