const express = require("express");
const Bill = require("../models/Bills");

const router = express.Router();

// POST: Create a new bill (place this route at the top)
router.post("/create", async (req, res) => {
  try {
    const { customer, phone, invoiceNumber, invoiceDate, stateOfSupply, items, roundOff, totalAmount } = req.body;

    const newBill = new Bill({
      customer,
      phone,
      invoiceNumber,
      invoiceDate,
      stateOfSupply,
      items,
      roundOff,
      totalAmount,
    });

    const savedBill = await newBill.save();
    res.status(201).json({ success: true, data: savedBill });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET: Retrieve all bills
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json({ success: true, data: bills });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET: Retrieve a single bill by ID
router.get("/:id", async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ success: false, message: "Bill not found" });
    res.status(200).json({ success: true, data: bill });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE: Delete a bill by ID
router.delete("/:id", async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
