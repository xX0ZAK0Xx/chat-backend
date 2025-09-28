import { check, validationResult } from "express-validator";

const sendMessageValidator = [
    check("message").not().isEmpty().withMessage("Message is required"),
    check("id").not().isEmpty().withMessage("Conversation id is required").isMongoId().withMessage("Invalid conversation id"),
];

const sendMessageValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedError = errors.mapped();
    if (Object.keys(mappedError).length === 0) {
        next();
    } else {
        res.status(400).json({ errors: mappedError });
    }
};

export { sendMessageValidator, sendMessageValidationHandler };