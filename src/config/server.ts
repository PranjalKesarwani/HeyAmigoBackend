import mongoose from "mongoose";
import express,{Request,Response} from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = 5000 || process.env.PORT;
const app = express()

mongoose.set("strictQuery", true);



mongoose
  .connect(process.env.DB_CONN_STRING as string, {
    serverSelectionTimeoutMS: 50000, // Set a 50-second timeout
   
  })
  .then(() => {
    console.log("DB connected")
  })
  .catch((err) => {
    console.log(err);
  });