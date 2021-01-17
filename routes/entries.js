const express = require("express");
const Entry = require("../models/entry");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("entries/new", { entry: new Entry() });
});

router.get("/edit/:id", async (req, res) => {
  const entry = await Entry.findById(req.params.id);
  res.render("entries/edit", { entry: entry });
});

router.get("/:slug", async (req, res) => {
  const entry = await Entry.findOne({ slug: req.params.slug });
  if (entry === null) res.redirect("/");
  res.render("entries/show", { entry: entry });
});

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

router.delete("/:id", async (req, res) => {
  await Entry.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
