const express = require("express");
const Entry = require("../models/entry");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("entries/new", { entry: new Entry() });
});

// router.get("/:id" (req, res) => {

// })

router.post("/", async (req, res) => {
  let entry = new Entry({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    entry = await entry.save();
    res.redirect(`/entries/${entry.id}`);
  } catch (error) {
    console.log(error);
    res.render("entries/new", { entry: entry });
  }
});

module.exports = router;
