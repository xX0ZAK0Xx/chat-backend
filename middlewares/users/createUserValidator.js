import { check, validationResult } from "express-validator";
import User from "../../models/userModel.js";
import createError from "http-errors";
import {unlink} from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const createUserValidator = [
    check("name").not().isEmpty().withMessage("Name is required"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    check("email").isEmail().withMessage("Please enter a valid email").custom(async(value, { req }) => {
        try {
            const user = await User.findOne({ email: value });
            if (user) {
                throw createError("Email already exists");
            }
        } catch (error) {
            throw createError(error.message);
        }
    }),
    check("phone").isMobilePhone("bn-BD").withMessage("Please enter a valid phone number").custom(async(value, { req }) => {
        try {
            const user = await User.findOne({ phone: value });
            if (user) {
                throw createError("Phone number already exists");
            }
        } catch (error) {
            throw createError(error.message);
        }
    }),

];

const createUserValidationHandler = (req, res, next) => {
    const error = validationResult(req);
    const mappedError = error.mapped();
    if(req.userRole === "user"){
        mappedError.user = "You are not authorized to create a user";
    }
    if(Object.keys(mappedError).length === 0){
        next();
    }else{
        if(req.files && req.files.length > 0){
            const photo = req.files[0].filename;
            unlink(`public/uploads/photos/${photo}`, (err) => {
                if(err){
                    console.log(err);
                }
            });
        }
        res.status(400).json({errors: mappedError});
    }
}

export { createUserValidator, createUserValidationHandler };