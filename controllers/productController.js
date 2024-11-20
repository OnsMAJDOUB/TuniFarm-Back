const Product = require("../models/Product");

// Test route
exports.test = (req, res) => {
  res.send("Test product OK!");
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, price, quantity, method, region, description, image } =
    req.body;
  try {
    const product = new Product({
      name,
      price,
      quantity,
      method,
      region,
      description,
      image,
      farmer: req.user.id,
    });
    await product.save();
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(400).json({ message: "Error creating product", error });
  }
};

// Get all products with filters
exports.getProducts = async (req, res) => {
  const { region, method } = req.query;
  const query = {};

  if (region) query.region = region;
  if (method) query.method = method;

  try {
    const products = await Product.find(query).populate(
      "farmer",
      "name location"
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneAndUpdate(
      { _id: id, farmer: req.user.id },
      req.body,
      { new: true }
    );
    if (!product)
      return res
        .status(404)
        .json({ message: "Product not found or not authorized" });
    res.json({ message: "Product updated", product });
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneAndDelete({
      _id: id,
      farmer: req.user.id,
    });
    if (!product)
      return res
        .status(404)
        .json({ message: "Product not found or not authorized" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
