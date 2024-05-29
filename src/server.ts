import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import HealthChecker from "./routes";
import Router from "./routes/routeV1";
import { connectToDatabase } from "./db/ConnectionFactory";

const app = express();
dotenv.config();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/", HealthChecker);
app.use("/api", Router);

connectToDatabase();

const { PORT = 4088 } = process.env;
app.listen(PORT, () => {
    console.log(`Server started: listening on port ${PORT}`)
});
