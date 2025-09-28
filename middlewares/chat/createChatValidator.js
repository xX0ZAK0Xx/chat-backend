import { check, validationResult } from "express-validator";

const createChatValidator = [];

const createChatValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedError = errors.mapped();
    if (Object.keys(mappedError).length === 0) {
        next();
    } else {
        res.status(400).json({ errors: mappedError });
    }
};

export { createChatValidator, createChatValidationHandler };