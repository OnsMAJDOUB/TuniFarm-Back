const Product = require("../models/product");

exports.test = (req, res) => {
  res.send("Test OK!");
};

exports.addProduct = async (req, res) => {
  try {
    const newProduct = req.body;

    const savedProduct = new Product({
      ...newProduct,
      addedBy: req.user._id, // Add the current user's ID directly
    });

    await savedProduct.save();

    res.status(201).send({ msg: "Product added successfully", savedProduct });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const foundProducts = await Product.find();

    res.status(200).send({ msg: "All products: ", foundProducts });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const foundProduct = await Product.findById(id);

    if (!foundProduct) {
      return res.status(404).send({ msg: "Product not found" });
    }

    res.status(200).send({ msg: "Product found: ", foundProduct });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const foundProduct = await Product.findById(id);

    if (!foundProduct) {
      return res.status(404).send({ msg: "Product not found" });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).send({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = req.body;

    const editedProduct = await Product.findByIdAndUpdate(id, updatedProduct, {
      new: true,
    });

    if (!editedProduct) {
      return res.status(404).send({ msg: "Product not found" });
    }

    res
      .status(200)
      .send({ msg: "Product updated successfully", editedProduct });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    const foundMyProducts = await Product.find({ addedBy: req.user._id });

    res.status(200).send({ msg: "All products: ", foundMyProducts });
  } catch (error) {
    res.status(500).send(error);
  }
};
