const express = require("express");
const router = express.Router();
const { Item } = require("../models");

// GET /items
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    next(error);
  }
});

// GET /items/:title
router.get("/:title", async (req, res) => {

  try {
    const item = await Item.findOne({
      where: {title: req.params.title}
    })
    res.status(200).json(item)

  } catch (error) {
    console.error("There is a problem with getting a single item" + error)
    res.status(500).send(error)
  }

})

module.exports = router;
