import createError from "http-errors";

// 404 error handler
const notFound = (req, res, next) => {
    next(createError(404, "Route not found"));
};

// default error handler
const errorHandler = (err, req, res, next) => {
    res.locals.title = "Error";
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {message: err.message};
    res.status(err.status || 500);
    res.json(res.locals.error);
};

export { notFound, errorHandler };