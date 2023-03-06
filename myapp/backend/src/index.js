const express = require("express");
const mongoose = require("mongoose");

const route = require("./routes/route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", route);

// app.use("/users", route);
// app.use('/')
mongoose
  .set("strictQuery", true)
  .connect(
    "mongodb+srv://BAravind:Aru9900@cluster0.fq4pskd.mongodb.net/UserCredentials"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on ${process.env.PORT || 5000} port`);
});
