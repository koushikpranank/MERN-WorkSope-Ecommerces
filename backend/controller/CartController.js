const Cart = require("../model/cart");
const mongoose = require("mongoose");
//add cart
const AddToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const foundCartProduct = await Cart.findOne({ userId: userId });
    if (foundCartProduct == null) {
      await Cart.create({
        userId: new mongoose.Types.ObjectId(userId),
        productIds: new mongoose.Types.ObjectId(productId),
      });
    } else {
      await Cart.updateOne(
        { userId: new mongoose.Types.ObjectId(userId) },
        {
          $addToSet: { productIds: new mongoose.Types.ObjectId(productId) },
        },
      );
    }
    res.status(200).json({ message: "product added to cart successfully" });
  } catch (error) {
    res.status(500).json({ message: "failed to add cart" });
    console.log(error);
  }
};

//remove cart
const RemoveCartProduct = async (req, res) => {
  try {
    const { userId, productId } = req.query;
    const Result = await Cart.updateOne(
      { userId: new mongoose.Types.ObjectId(userId) },
      {
        $pull: { productIds: new mongoose.Types.ObjectId(productId) },
      },
    );

    if (Result.matchedCount === 0) {
      res.status(404).json({ message: "Invalid UserId" });
    }
    res.status(200).json({ message: "removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "failed to remove product in cart" });
    console.log(error);
  }
};

//total cost of CartProducts
const getTotalCost = async (req, res) => {
  try {
    const { userId } = req.query;

    if ((await Cart.findById(userId)) == null) {
      res.status(404).json({ message: "No Products Found" });
    }

    const Result = await Cart.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      { $unwind: "$productIds" },
      {
        $lookup: {
          from: "products",
          localField: "productIds",
          foreignField: "_id",
          as: "ProductsDetails",
        },
      },
      { $unwind: "$ProductsDetails" },
      {
        $group: {
          _id: "$userId",
          totalCost: { $sum: "$ProductsDetails.cost" },
        },
      },
    ]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get total cost" });
  }
};
//count cart Product Items
const addQuantity = async (req, res) => {
  try {
    const { userId, count, productId } = req.body;
    const foundCartProduct = await Cart.find({
      userId: new mongoose.Types.ObjectId(userId),
      productQuantity: {
        $elemMatch: { productId: new mongoose.Types.ObjectId(productId) },
      },
    });

    if (foundCartProduct.length != 0) {
      await Cart.updateOne(
        {
          userId: new mongoose.Types.ObjectId(userId),
          productQuantity: {
            $elemMatch: { productId: new mongoose.Types.ObjectId(productId) },
          },
        },
        {
          $set: {
            "productQuantity.$.count": count,
          },
        },
      );
      res.status(200).json({ message: "quantity added successfully" });
    } else {
      await Cart.updateOne(
        { userId: new mongoose.Types.ObjectId(userId) },
        {
          $addToSet: {
            productQuantity: {
              productId: new mongoose.Types.ObjectId(productId),
              count: count,
            },
          },
        },
      );
      res.status(200).json({ message: "quantity added successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to add quantity" });
  }
};
//get Products
const getCartProducts = async (req, res) => {
  const { userId } = req.query;
  try {
    const allCartProducts = await Cart.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$productIds" },
      { $project: { productIds: 1, _id: 0 } },
      {
        $lookup: {
          from: "products",
          localField: "productIds",
          foreignField: "_id",
          as: "details",
        },
      },
      { $unwind: "$details" },
    ]);

    if (allCartProducts.length == 0) {
      res.status(404).json({ message: "Cart Products Not Found" });
    }
    res.status(200).json({ allCartProducts });
  } catch (error) {
    res.status(500).json({ message: "failed to get cart products" });
  }
};

module.exports = {
  addQuantity,
  getTotalCost,
  AddToCart,
  RemoveCartProduct,
  getCartProducts,
};