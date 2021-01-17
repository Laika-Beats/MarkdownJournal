const express = require("express");
const entryRouter = require("./routes/entries.js");
const app = express();

app.set("view engine", "ejs");

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
