import express from "express";
const app = express();
import cors from "cors";

import Bookrouter from "./routes/Book.js";
import CartRouter from "./routes/Cart.js";
import FavouriteBookRouter from "./routes/Favourite.js";
import OrderRouter from "./routes/Order.js";
import UserRouter from "./routes/User.js";
import ConnectDB from "./config/ConnectDB.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 1100;
app.use(cors({
  origin:"https://bookstorewithadmin-frontend.onrender.com",
  credentials:true
}));
app.use(express.json());

//Calling Routes
app.use("/", UserRouter);
app.use("/", Bookrouter);
app.use("/", CartRouter);
app.use("/", FavouriteBookRouter);
app.use("/", OrderRouter);
app.get("/", (req, res) => {
  res.status(200).send("Backend is running");
});

//SERVER
 ConnectDB().then(()=>{
      console.log("database is connected");
      app.listen(PORT, () => {
  console.log(`Server Started at PORT : ${PORT} `);
 })
 }).catch((error=>{
    console.log("server is not runing ",error);
 }))
