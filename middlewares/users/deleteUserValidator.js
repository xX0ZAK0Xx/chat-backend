import { check, validationResult } from "express-validator";

const deleteUserValidator = [
    check("id").not().isEmpty().withMessage("User id is required").isMongoId().withMessage("Invalid user id")
];

const deleteUserValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedError = errors.mapped();
    if(req.userRole === "user" && req.params.id !== req.userId) {
        mappedError.id = "You are not authorized to delete this user";
    }else if(req.userRole === "admin" && req.params.id === req.userId) {
        mappedError.id = "You can not delete your own account";
    }

    if (Object.keys(mappedError).length === 0) {
        next();
    } else {
        res.status(400).json({ errors: mappedError });
    }
};

export { deleteUserValidator, deleteUserValidationHandler };