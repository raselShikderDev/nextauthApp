import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection

    connection.on("connected", () => {
      console.log("MongoDB is Connected");
    })
    connection.on("error", (err) => {
      console.log(`MongoDB connection Error, Make sure server is running: ${err}`);
      process.exit()
    })


  } catch (error) {
    console.log(`Somthing went wrong in connecting to Database: ${error}`)
  }
}