const mongoose = require("mongoose");

const bbqSchema = new mongoose.Schema(
  {
    img: { type: String },
    name: { type: String },
    dsc: { type: String },
    price: { type: Number },
    new_price: { type: Number },
    rate: { type: Number },
    country: { type: String },
    stock_status: { type: String },
    discount: { type: Number },
   
  },
  { timestamps: true }
);

const bbqFood = mongoose.model("bbq", bbqSchema);

module.exports = bbqFood;