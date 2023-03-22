const express = require("express");
const router = express.Router();
const { Item } = require("../models/index");
const { check, validationResult } = require("express-validator");

// GET /items
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    next(error);
  }
});

// GET /items/:id
router.get("/:id", async (req, res, next) => {
  try {
    const item = await Item.findByPk(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
});

// POST /items
router.post(
  "/",
  [
    check("title").not().isEmpty().trim(),
    check("price").not().isEmpty(),
    check("description").not().isEmpty().trim(),
    check("category").not().isEmpty().trim(),
    check("image").not().isEmpty().trim(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      // If the validationResults returns any errors, then trigger a response
      if (!errors.isEmpty()) {
        res.json({ error: errors.array() });
      }

      const singleItem = await Item.create(req.body);
      res.status(200).json(singleItem);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Item.destroy({ where: { id } });
    res.status(200).send("Item has been removed.");
  } catch (error) {
    next(error);
  }
});

// PUT - UPDATE the Item is present
router.put(
  "/:id",
  [
    check("title").not().isEmpty().trim(),
    check("price").not().isEmpty(),
    check("description").not().isEmpty().trim(),
    check("category").not().isEmpty().trim(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      // If the validationResults returns any errors, then trigger a response
      if (!errors.isEmpty()) {
        res.json({ error: errors.array() });
      }

      const item = await Item.findByPk(req.params.id);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
	  
      const updatedItem = await item.update(req.body);
      res.status(200).json(updatedItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
