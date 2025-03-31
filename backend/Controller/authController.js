import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModal from '../Models/userModal.js'

export const signup = async (req, res) => {
    try {

        const { email, name, password } = req.body;
        const existUser = await userModal.findOne({ email });

        if (existUser) {
            return res.status(409).json({
                message: "User already exist , you can login",
                success: false,
            })
        }
        const newUser = new userModal({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

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

    const { email, password } = req.body;
    const existUser = await userModal.findOne({ email });

    if (!existUser) {
        return res.status(404).json({
            message: "user not found",
            success: false,
        })
    }

    const isPasswordCorrect  =  await bcrypt.compare(password,existUser.password);
    if(!isPasswordCorrect){
        return res.status(403).json({
            message:"Password is incorrect Typ other Password",
            success:false,
        })
    }
    const jwtToken = jwt.sign(
        {email:existUser.email,_id:existUser._id},
        process.env.JWT_SECRET,
        {expiresIn:"24h"}
    );
    res.status(200).json({
        message:"Login Successfully",
        success:true,
        name:existUser.name,
        userId:existUser._id,
        jwtToken
    })
}