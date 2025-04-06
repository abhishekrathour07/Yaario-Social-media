import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModal from '../Models/userModal.js'
import responseHandler from '../utils/responseHandler.js';
import bioModal from '../Models/BioModel.js';

export const signup = async (req, res) => {
    try {

        const { email, name, password } = req.body;
        const existUser = await userModal.findOne({ email });

        if (existUser) {
            return responseHandler(res, 400, "User already exists");
        }
        const newUser = new userModal({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        // default values will auto apply
        const newBio = await bioModal.create({
            user: newUser._id
        });
        await newBio.save()
        res.status(200).json({
            message: "Signup Successfully, you can login now",
            success: true,
        })

    } catch (error) {
        console.log("Error while creating Yaario Account", error);
        res.status(500).json({
            message: "Server Error",
            success: false,
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await userModal.findOne({ email });

        if (!existUser) {
            console.log("User not found");
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
        if (!isPasswordCorrect) {
            console.log("Incorrect password");
            return res.status(403).json({
                message: "Password is incorrect",
                success: false,
            });
        }

        const token = jwt.sign(
            { email: existUser.email, _id: existUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        console.log("Generated Token:", token);

        res.cookie('auth_token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
        });

        res.status(200).json({
            message: "Login Successfully",
            success: true,
            name: existUser.name,
            userId: existUser._id
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            success: false,
            error: error.message
        });
    }
};
