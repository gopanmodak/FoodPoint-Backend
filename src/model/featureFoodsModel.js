const mongoose = require("mongoose");

const featureFoodSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    slug: String,
    description: String,
    price: Number,
    discountPrice: Number,
    category: {
      _id: String,
      name: String,
    },
    image: String,
    images: [String],
    ingredients: [String],
    isAvailable: Boolean,
    isFeatured: Boolean,
    stock: Number,
    preparationTime: Number,
    rating: Number,
    reviewCount: Number,
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true },
);

const featureFoods = mongoose.model("featurefoods", featureFoodSchema);
module.exports = featureFoods;
