const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()

// app setup
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// connect to db
const uri = process.env.DB_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true } );

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected to database");
});

// add our routes
const cartRouter = require('./routes/cart');
app.use('/cart', cartRouter);

const catelogueRouter = require('./routes/catelogue');
app.use('/catelogue', catelogueRouter);


// start app
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
