const decorateHtmlPage = (pageTitle) => (req, res, next) => {
    res.locals.title = pageTitle;
    res.locals.html = true;
    next();
};

export default decorateHtmlPage;