const mongoose = require("mongoose");

const cartSchmea = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true },
    productId: { type: [mongoose.Types.ObjectId], required: true },
    productQuantity: [
      {
        productId: { type: mongoose.Types.ObjectId },
        count: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("cart", cartSchmea);
