const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  waiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Waiter',
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  earnings: {
    type: Number,
    required: true
  },
  deductions: {
    type: Number,
    default: 0
  },
  bonuses: {
    type: Number,
    default: 0
  }
});

const Payroll = mongoose.model('Payroll', payrollSchema);

module.exports = Payroll;