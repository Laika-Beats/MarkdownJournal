const express = require("express");
const mongoose = require("mongoose");
const Entry = require("./models/entry");
const entryRouter = require("./routes/entries.js");
const methodOverride = require("method-override");
const app = express();

mongoose.connect(
  "mongodb+srv://journal:journal@cluster0.xdav1.mongodb.net/journal?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("🌐🌐🌐 Connected to mongoDB 🌐🌐🌐");
  }
);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use("/entries", entryRouter);

app.get("/", async (req, res) => {
  const entries = await Entry.find().sort({ createdAt: "desc" });
  res.render("entries/index", { entries: entries });
});

app.listen(5000, () => {
  console.log("🌎🌎🌎 Listening at localhost:5000 🌎🌎🌎");
});
