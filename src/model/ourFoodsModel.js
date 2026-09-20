const mongoose = require("mongoose");

const ourFoodSchema = new mongoose.Schema(
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
     category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const ourFoods = mongoose.model("ourfoods", ourFoodSchema);

module.exports = ourFoods;
