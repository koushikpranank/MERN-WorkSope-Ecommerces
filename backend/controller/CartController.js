const Cart = require("../model/cart");
const mongoose = require("mongoose");
const { sendOrderPlacedEmail } = require("../services/emailServices");

// Add cart
const AddToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const productObjectId = new mongoose.Types.ObjectId(productId);

    let foundCartProduct = await Cart.findOne({
      $or: [{ userId: userObjectId }, { userId: userId }],
    });

    if (!foundCartProduct) {
      await Cart.create({
        userId: userObjectId,
        productIds: [productObjectId],
      });
    } else {
      await Cart.updateOne(
        { _id: foundCartProduct._id },
        {
          $addToSet: { productIds: productObjectId },
        },
      );
    }
    return res
      .status(200)
      .json({ message: "product added to cart successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to add cart" });
  }
};

// Remove cart
const RemoveCartProduct = async (req, res) => {
  try {
    const { userId, productId } = req.query;
    const userQuery = mongoose.Types.ObjectId.isValid(userId)
      ? {
          $or: [
            { userId: new mongoose.Types.ObjectId(userId) },
            { userId: userId },
          ],
        }
      : { userId: userId };

    const Result = await Cart.updateOne(userQuery, {
      $pull: { productIds: new mongoose.Types.ObjectId(productId) },
    });

    if (Result.matchedCount === 0 || Result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Invalid UserId or Product not found" });
    }
    return res.status(200).json({ message: "removed successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "failed to remove product in cart" });
  }
};

// Total cost of CartProducts
const getTotalCost = async (req, res) => {
  try {
    const { userId } = req.query;
    const userQuery = mongoose.Types.ObjectId.isValid(userId)
      ? {
          $or: [
            { userId: new mongoose.Types.ObjectId(userId) },
            { userId: userId },
          ],
        }
      : { userId: userId };

    const cartExists = await Cart.findOne(userQuery);
    if (!cartExists) {
      return res.status(404).json({ message: "No Products Found" });
    }

    const Result = await Cart.aggregate([
      {
        $match: userQuery,
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
          totalCost: { $sum: { $toDouble: "$ProductsDetails.cost" } },
        },
      },
    ]);

    return res.status(200).json(Result[0] || { totalCost: 0 });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to get total cost" });
  }
};

// Count cart Product Items
const addQuantity = async (req, res) => {
  try {
    const { userId, count, productId } = req.body;
    const userQuery = mongoose.Types.ObjectId.isValid(userId)
      ? {
          $or: [
            { userId: new mongoose.Types.ObjectId(userId) },
            { userId: userId },
          ],
        }
      : { userId: userId };

    const foundCartProduct = await Cart.find({
      ...userQuery,
      productQuantity: {
        $elemMatch: { productId: new mongoose.Types.ObjectId(productId) },
      },
    });

    if (foundCartProduct.length != 0) {
      await Cart.updateOne(
        {
          ...userQuery,
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
      return res.status(200).json({ message: "quantity added successfully" });
    } else {
      await Cart.updateOne(userQuery, {
        $addToSet: {
          productQuantity: {
            productId: new mongoose.Types.ObjectId(productId),
            count: count,
          },
        },
      });
      return res.status(200).json({ message: "quantity added successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to add quantity" });
  }
};

// Get Products
const getCartProducts = async (req, res) => {
  const { userId } = req.query;
  try {
    const userQuery = mongoose.Types.ObjectId.isValid(userId)
      ? {
          $or: [
            { userId: new mongoose.Types.ObjectId(userId) },
            { userId: userId },
          ],
        }
      : { userId: userId };

    const cartDoc = await Cart.findOne(userQuery);

    if (!cartDoc || !cartDoc.productIds || cartDoc.productIds.length === 0) {
      return res.status(404).json({ message: "Cart Products Not Found" });
    }

    const allCartProducts = await Cart.aggregate([
      { $match: userQuery },
      { $unwind: "$productIds" },
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

    if (!allCartProducts || allCartProducts.length === 0) {
      return res.status(404).json({ message: "Cart Products Not Found" });
    }
    return res.status(200).json({ allCartProducts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to get cart products" });
  }
};

module.exports = {
  addQuantity,
  getTotalCost,
  AddToCart,
  RemoveCartProduct,
  getCartProducts,
};
