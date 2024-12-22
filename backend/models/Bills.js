const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  phone: { type: String, required: true },
  invoiceNumber: { type: Number, required: true },
  invoiceDate: { type: Date, default: Date.now },
  stateOfSupply: { type: String },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      unit: { type: String },
      pricePerUnit: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      taxPercentage: { type: Number, default: 0 },
      totalAmount: { type: Number, required: true },
    },
  ],
  roundOff: { type: Boolean, default: false },
  totalAmount: { type: Number, required: true },
});

module.exports = mongoose.model("Bill", BillSchema);
