import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to DB on host: ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
    console.log("Unable to connect to mongodb database");
  }
};

export default connectToDB;
