import { check, validationResult } from "express-validator";

const signInValidator = [
    check("email").isEmail().withMessage("Please enter a valid email"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];

const signInValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedError = errors.mapped();
    if (Object.keys(mappedError).length === 0) {
        next();
    } else {
        res.status(400).json({ errors: mappedError });
    }
};

export { signInValidator, signInValidationHandler };