import mongoose from "mongoose";

const main = async () => {
  await mongoose.connect(
    "mongodb+srv://BAravind:qUR0aXOKJnnSITqa@cluster0.fq4pskd.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("Connected to MongoDB");
};
export default main;
