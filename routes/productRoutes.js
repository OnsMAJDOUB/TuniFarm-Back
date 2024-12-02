const express = require("express");
const {
  test,
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
  editProduct,
  getMyProducts,
} = require("../controllers/productController");
const isAuth = require("../middlewares/isAuth");

const Router = express.Router();

Router.get("/test", test);

Router.post("/add-product", isAuth, addProduct);

Router.get("/get-products", getProducts);

Router.get("/get-product/:id", getProductById);

Router.delete("/delete-product/:id", deleteProduct);

Router.put("/update-product/:id", editProduct);

Router.get("/get-my-products", isAuth, getMyProducts);

module.exports = Router;
