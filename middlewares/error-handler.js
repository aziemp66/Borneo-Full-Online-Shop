function handleErrors(error, req, res, next) {
    console.log(error);

    if (error.code === 404) {
        res.status(404).render("shared/404", { pageTitle: "Page not found" });
    }

    res.status(500).render("shared/500", { pageTitle: "Something went wrong" });
}

module.exports = handleErrors;
