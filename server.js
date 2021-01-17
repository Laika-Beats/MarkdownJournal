const express = require("express");
const entryRouter = require("./routes/entries.js");
const app = express();

app.set("view engine", "ejs");

app.use("/entries", entryRouter);

app.get("/", (req, res) => {
  const entries = [
    {
      title: "Test Article",
      createdAt: Date.now(),
      description: "Test Description",
    },
  ];
  res.render("index", { entries: entires });
});

app.listen(5000);
