import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
    path: './.env'
});

const startServer = async ()=> {
    try {
        await connectDB()
        app.on("error",(error) => {
        console.log("ERROR",error);
        throw error;
        });
        app.listen(process.env.PORT || 6000, () => {
            console.log(`Server is running on Port:
                ${process.env.PORT}`);
        })

} catch (error) {
    console.log("MongoDB Connection Failed", error);
    }
}
startServer();