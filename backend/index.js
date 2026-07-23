// import dns from "dns";

// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import connectDB from "./config/db.js";
// import taskRoute from "./routes/taskRoute.js";


// dotenv.config();


// connectDB();


// const app = express();



// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));


// app.use(express.json());



// app.use("/api/tasks", taskRoute);



// const PORT = process.env.PORT || 5000;


// app.listen(PORT, () => {

//     console.log(`Server Running on ${PORT}`);

// });