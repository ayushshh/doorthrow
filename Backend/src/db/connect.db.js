import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`mongodb connected!! Host is ${connect.connection.host}`);
  } catch (error) {
    console.log(error, "Error while connected to db");
    process.exit(1);
  }
};

export default connectDb;
