import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const ConnectDB = async () => {
  // console.log("first,", process.env.MONGO_URI);
  await mongoose.connect(`${process.env.MONGO_URI}`);
 
};

export default ConnectDB;
