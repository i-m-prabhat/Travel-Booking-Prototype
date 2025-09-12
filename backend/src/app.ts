import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//routes import 
// import userRouter from './routes/user.routes.js'

//routes declaration
app.get("/", (req: any, res: any) =>
{
    res.json({
        message: "Welcome to the Travel API!",
        statusCode: 200,
    });
});

// app.use("/api/v1/users", userRouter)


export { app };