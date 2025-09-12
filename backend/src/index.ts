import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import { app } from "./app";

connectDB().then(() =>
{
    app.on("error", (error) =>
    {

        console.error("ERROR Connecting to Database", error);
        throw error
    });

    app.listen(process.env.PORT || 8000, () =>
    {
        console.log(`Server running on port ${process.env.PORT || "8000"}`);
    })
}).catch((err) =>
{
    console.log("Database Connection failed!", err);
})

