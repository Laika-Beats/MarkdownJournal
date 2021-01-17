const express = require("express");
const mongoose = require("mongoose");
const entryRouter = require("./routes/entries.js");
const app = express();

mongoose.connect("mongodb://localhost/journal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

app.listen(5000);
