import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";


import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/user.routes.js";
import sarahRouter from "./routes/present.routes.js";
import ralfRouter from "./routes/present.routes.js";
import nicRouter from "./routes/present.routes.js";
import jonasRouter from "./routes/present.routes.js";
import georgRouter from "./routes/present.routes.js";
import generalRouter from "./routes/present.routes.js";

dotenv.config();



const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});



app.use("/api/v1/users", userRouter);
app.use("/api/v1/sarah", sarahRouter);
app.use("/api/v1/ralf", ralfRouter);
app.use("/api/v1/dominic", nicRouter);
app.use("/api/v1/jonas", jonasRouter);
app.use("/api/v1/georg", georgRouter);
app.use("/api/v1", generalRouter);

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);

        app.listen(8080, () =>
            console.log("Server started on port http://localhost:8080"),
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();