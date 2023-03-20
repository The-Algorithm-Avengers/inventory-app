const express = require("express");
const router = express.Router();
const { Item } = require("../models/index");

// GET /items
router.get("/", async (req, res, next) => {
	try {
		const items = await Item.findAll();
		res.send(items);
    console.log('hi')
	} catch (error) {
    console.log('heloo')
		next(error);
	}
});

// GET /items/:title
router.get("/:id", async (req, res) => {
	try {
    const item = await Item.findByPk(req.params.id)
		res.status(200).json(item);
	} catch (error) {
		console.error("There is a problem with getting a single item" + error);
		res.status(500).send(error);
	}
});

router.post("/", async (req, res) => {
	try {
    const singleItem = await Item.create(req.body)
		res.status(200).json(singleItem);
	} catch (error) {
		console.error("Problem with creating an item" + error);
		res.status(500).send(error);
	}
});


router.delete("/:id", async (req,res) => { 
  try{
    const oneItem = await Item.destroy(req.params.id)
    req.status(200).json(oneItem)
  } catch (error) {
    console.error("Cannot delete item" + error)
    res.status(500).send(error)
  }
})

module.exports = router;
