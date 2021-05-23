const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const route = require("./routes/routes");

mongoose.connect("mongodb://localhost:27017/shoppinglist", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MonogoDB");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use("/static", express.static("public"));

app.use("/api", route);

app.get("/", (req, res) => {
  res.send("Hai Gaurav");
});

app.listen(PORT, () => {
  console.log("Server started at port: " + PORT);
});
