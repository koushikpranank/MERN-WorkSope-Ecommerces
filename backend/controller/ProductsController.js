const Products = require("../model/products");

//add products
const AddProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    await Products.create(newProduct);
    res.status(200).json({ message: "product added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to add product" });
  }
};

//deleted product
const DeleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Products.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "product deleted Successfully", deletedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete Product" });
  }
};

// get all products

const GetProducts = async (req, res) => {
  try {
    const allProducts = await Products.find();
    res.status(200).json({ allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to get Products", err: error });
  }
};

// get product based on ID
const GetProductBasedOnId = async (req, res) => {
  try {
    const foundProduct = await Products.findById(req.params.id);
    res.status(200).json({ foundProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Product" });
  }
};

//update product based on ID
const UpdateProduct = async (req, res) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json({
      message: "updated Successfully",
      updatedProductDetails: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to update Product" });
  }
};

//filter Products based on price
const FilterProductsOnPrice = async (req, res) => {
  try {
    console.log(Number(req.query.min));
    console.log(Number(req.query.max));

    const filteredProducts = await Products.find({
      $and: [
        { price: { $gte: Number(req.query.min) } },
        { price: { $lte: Number(req.query.max) } },
      ],
    });
    res.status(200).json({ filteredProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to Filter products" });
  }
};

// filter products based on ratings

const FilterProductsOnRatings = async (req, res) => {
  try {
    const filteredProducts = await Products.find({
      ratings: req.query.ratings,
    });
    res.status(200).json(filteredProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to filter" });
  }
};

const getProductsWithPagination = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1; // 2
    let limit = parseInt(req.query.limit) || 20; //20

    const skip = (page - 1) * limit; // (2-1) *20   ->  1*20

    const ProductRecords = await Products.aggregate([
      { $skip: skip },
      { $limit: limit },
    ]);
    res.status(200).json({
      success: true,
      currentPage: page,
      ProductRecords,
    });
  } catch (error) {
    res.status(500).json({ message: "failed to get products" });
    console.log(error);
  }
};

const getProductsBasedOnPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const filteredProducts = await Products.find({
      cost: { $gte: minPrice, $lte: maxPrice },
    });
    if (filteredProducts.length == 0) {
      return res.status(404).json({
        message: `No products found in the specified price range ${minPrice} To ${maxPrice}`,
      });
    } else {
      res.status(200).json({ filteredProducts });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to filter products based on price" });
  }
};

const getProductsBasedOnBrand = async (req, res) => {
  try {
    const { brand } = req.query;
    const filteredProducts = await Products.find({
      brand: brand.toLowerCase(),
    });
    if (filteredProducts.length == 0) {
      return res.status(404).json({
        message: `No products found for the specified brand ${brand}`,
      });
    } else {
      res.status(200).json({ filteredProducts });
    }
  } catch (error) {
    console.log(error);
  }
};

const getLimitedProducts = async (req, res) => {
  try {
    const { pages, limit } = req.query;
    const foundProducts = await Products.find()
      .skip((pages - 1) * limit)
      .limit(limit);
    if (foundProducts.length == 0) {
      return res.status(404).json({
        message: `No products found for the specified page ${pages} and limit ${limit}`,
      });
    }
    res.status(200).json({ currentPage: pages, limit: limit, foundProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get limited products" });
  }
};

module.exports = {
  AddProduct,
  GetProducts,
  GetProductBasedOnId,
  DeleteProduct,
  UpdateProduct,
  FilterProductsOnPrice,
  FilterProductsOnRatings,
  getProductsWithPagination,
  getProductsBasedOnPrice,
  getProductsBasedOnBrand,
  getLimitedProducts,
};
