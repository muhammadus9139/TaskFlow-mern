import dns from "dns";
import cookieParser from "cookie-parser";


dns.setServers(["8.8.8.8", "8.8.4.4"]);


import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import connectDB from "./config/db.js";


import taskRoute from "./routes/taskRoute.js";
import authRoute from "./routes/auth.js";



dotenv.config();



connectDB();



const app = express();




app.use(cors({

    origin:"http://localhost:5173",

    credentials:true

}));



app.use(express.json());

app.use(cookieParser());





// Routes


app.use("/api/tasks", taskRoute);


app.use("/api/auth", authRoute);





const PORT = process.env.PORT || 5000;



app.listen(PORT,()=>{


    console.log(`Server Running on ${PORT}`);


});