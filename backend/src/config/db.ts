import mongoose from "mongoose";
import { DB_NAME } from "../constants";


const connectDB = async () =>
{
    try
    {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

        const dbName = connectionInstance.connection.db?.databaseName ?? "Unknown";
        console.log(`\nDatabase Connection Successful! \nDB HOST: ${connectionInstance.connection.host} \nDB NAME: ${dbName}\n`);
        // console.log(connectionInstance);

    } catch (error)
    {
        console.log("Database Connection failed!", error);
        process.exit(1);
    }
}


export default connectDB;