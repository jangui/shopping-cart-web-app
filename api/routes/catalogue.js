const router = require('express').Router();
let Catalogue = require('../models/catalogue.model');

// get all items
router.route('/').get( async (req, res) => {
  try {
    let items = await Catalogue.find();
    return res.json(items)
  } catch(err) {
    err.msg = "Error getting all items in catalogue";
    return res.status(400).json({error: err});
  }
});

// get total item count
router.route('/total').get( async (req, res) => {
  try {
    let count = await Catalogue.countDocuments();
    return res.json(count)
  } catch(err) {
    err.msg = "Error getting total item count in catalogue";
    return res.status(400).json({error: err});
  }
});

// add item
router.route('/add').post( async (req, res) => {
  const name = req.body.name;
  const category = req.body.category;

  const newItem = new Catalogue({name, category});

  try {
    let response = await newItem.save();
    return res.json(`Item '${name}' added!`);
  } catch(err) {
    err.msg = `Error adding ${name}`;
    return res.status(400).json({error: err});
  }
});


// delete item by id
router.route('/:id').delete( async (req, res) => {
  try {
    await Catalogue.findByIdAndDelete(req.params.id);
    return res.json("post deleted")
  } catch(err) {
    err.msg = `Error deleting ${req.params.id}`;
    return res.status(400).json({error: err});
  }
});

// update item
router.route('/update/:id').post( async (req, res) => {
  try {
    let itemDoc = await Catalogue.findById(req.params.id);
    itemDoc.name = req.body.name;
    itemDoc.category = req.body.category;

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
