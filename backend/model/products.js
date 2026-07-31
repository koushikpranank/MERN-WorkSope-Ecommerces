const mongoose = mongoose.model("mongoose");

const ProductsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    cost: { type: String, required: true },
    image: { type: String, required: true },
    about: { type: String, required: true },
    reviews: { type: String, required: true },
    quantity: { type: String, required: true },
    discount: { type: String, required: true },
},{timestamps: true});

const ProductsModel = mongoose.model("products", ProductsSchema);

// module.exports = ProductsModel;
