import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Costa799:porto2025@cluster0.6t3ja.mongodb.net/myGym?retryWrites=true&w=majority"
    );

    console.log("Connected MongoDB!");
  } catch (error) {
    console.error("Error connecting, try again", error);
    process.exit(1);
  }
};

connectDB();

export default connectDB;
