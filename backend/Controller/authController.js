import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModal from '../Models/userModal.js'
import responseHandler from '../utils/responseHandler.js';
import bioModal from '../Models/BioModel.js';

export const signup = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            return responseHandler(res, 400, "All fields are required");
        }

        const existUser = await userModal.findOne({ email });
        if (existUser) {
            return responseHandler(res, 400, "User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModal({ name, email, password: hashedPassword });
        await newUser.save();

        await bioModal.create({ user: newUser._id });

        return responseHandler(res, 201, "User created successfully");
    } catch (error) {
        console.error(error);
        responseHandler(res, 500, "Internal Server Error", { error: error.message });
    }
}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await userModal.findOne({ email });

        if (!existUser) {
            return responseHandler(res, 404, "User not found");
        }

        const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
        if (!isPasswordCorrect) {
            return responseHandler(res, 401, "Incorrect password");
        }

        const token = jwt.sign(
            { email: existUser.email, _id: existUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.cookie('auth_token', token, {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
            httpOnly: true,
            secure:true,
            sameSite:"none",
            path:"/"
        });
        return responseHandler(res, 200, "Login Successfully", {
            name: existUser.name,
            userId: existUser._id,
            avatar: existUser.avatar
        })

    } catch (error) {
        return responseHandler(res, 500, "Internal Server Error", { error: error.message })
    }
};

export const logout = (req, res) => {
    res.clearCookie('auth_token',{
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
        });
    responseHandler(res, 200, "Logout Successfully");
};
