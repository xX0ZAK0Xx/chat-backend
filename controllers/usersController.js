import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {unlink} from "fs";

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        const filteredUsers = users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            photo: user.photo
        }))
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: filteredUsers
        })
    } catch (err) {
        next(err);
    }
}

const createUser = async (req, res) => {
    let newUser;
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    if(req.files && req.files.length > 0){
        const photo = req.files[0].filename;
        newUser = new User({
            ...req.body,
            password: hashedPass,
            photo
        });
    }else{
        newUser = new User({
            ...req.body,
            password: hashedPass
        });
    }

    try {
        const user = await newUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    message: error.message
                }
            }
        });
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(user){
            const isValidPass = await bcrypt.compare(password, user.password);
            if(isValidPass){
                const token = jwt.sign({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }, process.env.JWT_SECRET, {expiresIn: "1d"});
                res.status(200).json({
                    success: true,
                    message: "User signed in successfully",
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        role: user.role
                    },
                    token
                })
            }else{
                res.status(401).json({
                    errors: {
                        common: {
                            message: "Invalid email or password"
                        }
                    }
                })
            }
        }else{
            res.status(401).json({
                errors: {
                    common: {
                        message: "Invalid email or password"
                    }
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    message: error.message
                }
            }
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        // find if the user exists
        const user = await User.findById(req.params.id);
        if(user){
            // delete the user
            await User.findByIdAndDelete(req.params.id);
            // delete photo if exists
            if(user.photo){
                const photoPath = `public/uploads/photos/${user.photo}`;
                unlink(photoPath, err => {
                    if(err){
                        console.log(err);
                    }
                })
            }
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            })
        }else{
            res.status(404).json({
                errors: {
                    common: {
                        message: "User not found"
                    }
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    message: error.message
                }
            }
        });
    }
}

export { getUsers, createUser, signIn, deleteUser };