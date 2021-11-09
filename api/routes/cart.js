const router = require('express').Router();
let Cart = require('../models/shoppingCart.model');

// get all items
router.route('/').get( async (req, res) => {
  try {
    let items = await Cart.find();
    return res.json(items)
  } catch(err) {
    return res.status(400).json('Error: ' + err);
  }
});

// get total item count
router.route('/total').get( async (req, res) => {
  try {
    let count = await Cart.countDocuments();
    return res.json(count)
  } catch(err) {
    return res.status(400).json('Error: ' + err);
  }
});

// add item
router.route('/add').post( async (req, res) => {
  const name = req.body.name;
  const category = req.body.category;

  const newItem = new Cart({name, category});

  try {
    let response = await newItem.save();
    return res.json(`Item '${name}' added!`);
  } catch(err) {
    return res.status(400).json('Error: ' + err);
  }
});


// delete item by id
router.route('/:id').delete( async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    return res.json("post deleted")
  } catch(err) {
    return res.status(400).json('Error: ' + err);
  }
});

// update item
router.route('/update/:id').post( async (req, res) => {
  try {
    let itemDoc = await Cart.findById(req.params.id);
    itemDoc.name = req.body.name;
    itemDoc.category = req.body.category;

    try {
      let response = await itemDoc.save();
      return res.json(`Item '${itemDoc.name}' updated!`);
    } catch(err) {
      return res.status(400).json('Error: ' + err);
    }
  } catch(err) {
    return res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
