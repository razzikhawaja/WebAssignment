const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  customerAddress: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  items: [{
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected', 'Delivered'],
    default: 'Pending'
  },
  rider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rider'
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;