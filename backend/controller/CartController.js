const Cart = require("../model/cart");
const mongoose = require("mongoose");
const { sendOrderPlacedEmail } = require("../services/emailServices");

// Add cart
const AddToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const productObjectId = new mongoose.Types.ObjectId(productId);

    let foundCartProduct = await Cart.findOne({ userId: userObjectId });

    if (foundCartProduct == null) {
      await Cart.create({
        userId: userObjectId,
        productId: [productObjectId],
        productQuantity: [{ productId: productObjectId, count: 1 }],
      });
    } else {
      await Cart.updateOne(
        { _id: foundCartProduct._id },
        {
          $addToSet: { productId: productObjectId },
        },
      );

      // Check if product quantity already exists, increment it if so, otherwise push it
      const hasQuantityEntry = foundCartProduct.productQuantity?.some(
        (q) => q.productId.toString() === productObjectId.toString(),
      );

      if (hasQuantityEntry) {
        await Cart.updateOne(
          {
            _id: foundCartProduct._id,
            "productQuantity.productId": productObjectId,
          },
          {
            $inc: { "productQuantity.$.count": 1 },
          },
        );
      } else {
        await Cart.updateOne(
          { _id: foundCartProduct._id },
          {
            $push: {
              productQuantity: { productId: productObjectId, count: 1 },
            },
          },
        );
      }
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
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const productObjectId = new mongoose.Types.ObjectId(productId);

    const Result = await Cart.updateOne(
      { userId: userObjectId },
      {
        $pull: {
          productId: productObjectId,
          productQuantity: { productId: productObjectId },
        },
      },
    );

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
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const cartExists = await Cart.findOne({ userId: userObjectId });
    if (!cartExists || !cartExists.productId) {
      return res.status(404).json({ message: "No Products Found" });
    }

    const Result = await Cart.aggregate([
      {
        $match: { userId: userObjectId },
      },
      { $unwind: "$productId" },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "ProductsDetails",
        },
      },
      { $unwind: "$ProductsDetails" },
      {
        $addFields: {
          matchedQuantityObj: {
            $arrayElemAt: [
              {
                $filter: {
                  input: { $ifNull: ["$productQuantity", []] },
                  as: "pq",
                  cond: { $eq: ["$$pq.productId", "$productId"] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $addFields: {
          itemCount: {
            $cond: {
              if: { $ne: ["$matchedQuantityObj", null] },
              then: "$matchedQuantityObj.count",
              else: 1,
            },
          },
        },
      },
      {
        $group: {
          _id: "$userId",
          totalCost: {
            $sum: {
              $multiply: [
                {
                  $toDouble: {
                    $ifNull: [
                      "$ProductsDetails.cost",
                      "$ProductsDetails.price",
                    ],
                  },
                },
                "$itemCount",
              ],
            },
          },
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
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const productObjectId = new mongoose.Types.ObjectId(productId);

    const updateResult = await Cart.updateOne(
      {
        userId: userObjectId,
        "productQuantity.productId": productObjectId,
      },
      {
        $set: { "productQuantity.$.count": count },
      },
    );

    if (updateResult.matchedCount === 0) {
      await Cart.updateOne(
        { userId: userObjectId },
        {
          $push: {
            productQuantity: {
              productId: productObjectId,
              count: count,
            },
          },
        },
      );
    }

    return res.status(200).json({ message: "quantity added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to add quantity" });
  }
};

// Get Products
const getCartProducts = async (req, res) => {
  const { userId } = req.query;
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const cartDoc = await Cart.findOne({ userId: userObjectId });

    if (!cartDoc || !cartDoc.productId || cartDoc.productId.length === 0) {
      return res.status(404).json({ message: "Cart Products Not Found" });
    }

    const allCartProducts = await Cart.aggregate([
      { $match: { userId: userObjectId } },
      { $unwind: "$productId" },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "details",
        },
      },
      { $unwind: "$details" },
      {
        $addFields: {
          matchedQuantityObj: {
            $arrayElemAt: [
              {
                $filter: {
                  input: { $ifNull: ["$productQuantity", []] },
                  as: "pq",
                  cond: { $eq: ["$$pq.productId", "$productId"] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $addFields: {
          count: {
            $cond: {
              if: { $ne: ["$matchedQuantityObj", null] },
              then: "$matchedQuantityObj.count",
              else: 1,
            },
          },
        },
      },
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
