import "dotenv/config";
import express from 'express';
import cors from 'cors';
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import leadRouter from './routes/lead.routes.js'
import contactRouter from "./routes/contact.routes.js";
import noteRouter from "./routes/notes.routes.js";
import tasksRouter from "./routes/tasks.routes.js";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true
    })
);

app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true}));
if(process.env.NODE_ENV !== "production") app.use(morgan("dev"));


app.get("/api/health", (req, res) => {
    return res.json({success: true , status : "ok", service: "TTP CRM API"})
});

app.use("/api/auth",authRouter);
app.use("/api/lead",leadRouter);
app.use("/api/contact",contactRouter);
app.use("/api/notes", noteRouter);
app.use("/api/tasks",tasksRouter);

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 8000;

const start = async () =>{
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`TTP CRM API running on http://localhost:${PORT}`),

        );

    } catch (err) {
        console.log(`failed to start server: `,err.message);
        process.exit(1);
        
    }
}

start();

export default app;