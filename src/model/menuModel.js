const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema(
  {
    calories: {
      type: Number,
      required: true,
    },

    totalFat: {
      type: String,
      required: true,
    },

    cholesterol: {
      type: String,
      required: true,
    },

    sodium: {
      type: String,
      required: true,
    },

    totalCarbohydrates: {
      type: String,
      required: true,
    },

    protein: {
      type: String,
      required: true,
    },

    caffeine: {
      type: String,
      default: "0mg",
    },

    disclaimer: {
      type: String,
      default:
        "* 2,000 calories a day is used for general nutrition advice, but calorie needs vary.",
    },
  },
  {
    _id: false,
  },
);

const foodSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      required: true,
    },

    nutrition: {
      type: nutritionSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Food = mongoose.model("foodmenu", foodSchema);

module.exports = Food;
