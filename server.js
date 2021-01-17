const express = require("express");
const mongoose = require("mongoose");
const entryRouter = require("./routes/entries.js");
const app = express();

mongoose.connect(
  "mongodb+srv://journal:journal@cluster0.xdav1.mongodb.net/journal?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("🌐🌐🌐 Connected to mongoDB 🌐🌐🌐");
  }
);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use("/entries", entryRouter);

app.get("/", (req, res) => {
  const entries = [
    {
      title: "Test Article",
      createdAt: new Date(),
      description: "Test Description",
    },
  ];
  res.render("entries/index", { entries: entries });
});

app.listen(5000, () => {
  console.log("🌎🌎🌎 Listening at localhost:5000 🌎🌎🌎");
});
