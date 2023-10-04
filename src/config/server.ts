import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = 5000 || process.env.PORT;
const app = express()

mongoose.set("strictQuery", true);

app.get("/",(req,res)=>{
  res.send("helllo from backend")
})


mongoose
  .connect(process.env.DB_CONN_STRING as string, {
    serverSelectionTimeoutMS: 50000, // Set a 50-second timeout
   
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`server app and Database listening on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });