// Import the necessary modules and models
const express = require('express');
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");
const Order = require('../models/orderSchema');
const Payroll = require('../models/payrollSchema');


let url =
  "";

mongoose
  .connect(url)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(() => {
    console.log("Something went Wrong while Connecting to Database");
  });

//-------------------------------------------------------------

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;


const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkey';

// Define the API endpoint for a rider to receive an order
router.put('/orders/:id/receive', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.status !== 'Accepted') {
      return res.status(400).json({ message: 'Order cannot be received' });
    }
    order.status = 'Delivered';
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Define the API endpoint for a waiter to view orders
router.get('/orders', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ status: { $ne: 'Delivered' } }).populate('rider');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Define the API endpoint for a waiter to view their payroll
router.get('/payroll', authenticateToken, async (req, res) => {
  try {
    const payroll = await Payroll.find({ waiter: req.user._id });
    res.json(payroll);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Define the authentication middleware function
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

module.exports = router;
``