const mongoose = require("mongoose");

const cartSchmea = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId },
    productId: { type: [mongoose.Types.ObjectId], required: true },
  },

  { timestamp: "true" },
);
module.exports = mongoose.model("cart", cartSchmea);
