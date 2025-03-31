import mongoose from 'mongoose'

export const connectedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Yaario Database");
    } catch (error) {
        console.log(error);
        console.log("Trouble while connecting to the Database")
        process.exit(1);
    }
}