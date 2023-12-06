const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { User } = require("./models/user");
const { Book } = require("./models/book");

const addBook = require("./routes/addBook");
const addUser = require("./routes/addUser");
const fetchbooks = require("./routes/fetchBooks");

const PORT = process.env.PORT || 8080;

dotenv.config();
app.use(cors());
app.use(express.json());
console.log("Mongo URI:", process.env.MONGO_URI);

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

app.use("/api", addBook);
app.use("/api", addUser);
app.use("/api", fetchbooks);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
