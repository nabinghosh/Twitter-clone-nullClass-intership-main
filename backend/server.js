import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cors from "cors";
import { connectDb } from "./db/db.js";
import postRouter from "./router/postRouter.js";
import userRouter from "./router/userRouter.js";
dotenv.config();



const app = express();
const PORT = 4500 || process.env.PORT;
app.use(cors());
app.use(express.json());

//post
app.use('/post', postRouter);

//user
app.use('/user' ,userRouter);

// app.listen(PORT , ()=>{
//      console.log(`tWitter server start on : ${PORT}`);
// })
// Start server
const startServer = async () => {
     try {
         await connectDb();
         app.listen(PORT, () => {
             console.log(`Server running on http://localhost:${PORT}`);
         });
     } catch (error) {
         console.error('Failed to start server:', error);
         process.exit(1);
     }
 };
 startServer();