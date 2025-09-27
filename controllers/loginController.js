import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const loginController = async (req, res) => {
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

export { loginController };