const router = require('express').Router();
let Cart = require('../models/shoppingCart.model');

// get all items
router.route('/').get( async (req, res) => {
  try {
    let items = await Cart.find();
    return res.json(items)
  } catch(err) {
    err.msg = "Error getting items in cart";
    return res.status(400).json({error: err});
  }
});

// get total item count
router.route('/total').get( async (req, res) => {
  try {
    let count = await Cart.countDocuments();
    return res.json(count)
  } catch(err) {
    err.msg = "Error getting total item count in cart";
    return res.status(400).json({error: err});
  }
});

// find post by id
router.route('/:id').get( async (req, res) => {
  try {
    let item = await Cart.findById(req.params.id);
    return res.json(item)
  } catch(err) {
    err.msg = `Error finding post ${req.params.id}`;
    return res.status(400).json({error: err});
  }
});

// add item
router.route('/add').post( async (req, res) => {
  const name = req.body.name;

  // handle int parsing
  let quantity = req.body.quantity;
  if (isNaN(parseFloat(quantity))) {
    // error
    return res.status(400).json({error: {msg: 'Error: Quantity provided is not an integer'}});
  } else if (isFinite(quantity)) {
    // parse Int if number recieved
    quantity = parseInt(quantity);
  }


  const newItem = new Cart({name, quantity});

  try {
    let response = await newItem.save();
    let msg = `Item '${name}' added!`;
    return res.json({'response': msg, 'id': response._id});
  } catch(err) {
    err.msg = `Error adding ${name}`;
    return res.status(400).json({error: err});
  }
});


// delete item by id
router.route('/:id').delete( async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    return res.json("post deleted")
  } catch(err) {
    err.msg = `Error deleting ${req.params.id}`;
    return res.status(400).json({error: err});
  }
});

// update item
router.route('/update/:id').post( async (req, res) => {
  try {
    let itemDoc = await Cart.findById(req.params.id);
    itemDoc.name = req.body.name;
    itemDoc.quantity = parseInt(req.body.quantity);

    try {
      let response = await itemDoc.save();
      return res.json(`Item '${itemDoc.name}' updated!`);
    } catch(err) {
      err.msg  = `Error updating ${itemDoc.name}`;
      return res.status(400).json({error: err});
    }
  } catch(err) {
      err.msg  = `Error finding ${req.params.id}`;
      return res.status(400).json({error: err});
  }
});

module.exports = router;
