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

// GET /items/:id
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
    const id = req.params.id
    await Item.destroy({ where: { id } })
    res.status(200).send("Item has been removed.")
  } catch (error) {
    console.error("Cannot delete item" + error)
    res.status(500).send(error)
  }
})


// PUT - UPDATE the Item is present
router.put('/:id', async (req, res) => {
	try {
	  const item = await Item.findByPk(req.params.id);
	  if (!item) {
		return res.status(404).json({ error: 'Item not found' });
	  }
	  const updatedItem = await item.update(req.body);
	  res.status(200).json(updatedItem);
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Cannot update item');
	}
  });

module.exports = router;
