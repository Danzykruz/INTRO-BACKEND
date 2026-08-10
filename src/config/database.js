import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)

        console.log(`\n CONNECTED!!
        ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("CONNECTION FAILED",error);
        process.exit(1)

    }
}
export default connectDB;