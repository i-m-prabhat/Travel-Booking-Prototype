import express from "express";
import cors from "cors";
import errorHandler from "middlewares/error.middleware";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//routes import 
import routes from "./routes";

//routes declaration
app.get("/", (req: any, res: any) =>
{
    res.json({
        message: "Welcome to the Travel API!",
        statusCode: 200,
    });
});

app.use("/api/v1", routes);


// Handle unknown routes
app.use((req, res) =>
{
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});

app.use(errorHandler);


export { app };