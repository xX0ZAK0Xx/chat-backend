// external modules
import express from "express";

// internal modules
import { getUsers, createUser, signIn, deleteUser } from "../controllers/usersController.js";
import userPhotoUploader from "../middlewares/users/uploadPhoto.js";
import {createUserValidator, createUserValidationHandler} from "../middlewares/users/createUserValidator.js";
import {signInValidator, signInValidationHandler} from "../middlewares/users/signInValidator.js";
import {deleteUserValidator, deleteUserValidationHandler} from "../middlewares/users/deleteUserValidator.js";
import validateToken from "../middlewares/common/validateToken.js";

const router = express.Router();

router.get("/", validateToken, getUsers);

// create a new user
router.post("/", validateToken, userPhotoUploader, createUserValidator, createUserValidationHandler, createUser);

// sign in
router.post("/signin", signInValidator, signInValidationHandler, signIn);

// delete a user
router.delete("/:id", validateToken, deleteUserValidator, deleteUserValidationHandler, deleteUser);


export default router;