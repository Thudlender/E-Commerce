const ProductModel = require("../models/Product");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

exports.createProduct = async (req, res) => {
  //File upload
  // console.log(req.file);
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }
  const firebaseUrl = req.file.firebaseUrl;
  console.log(firebaseUrl);

  const { name, description, category, price } = req.body;
  if ((!name || !description || !category || !price)) {
    return res.status(400).json({ message: "All Fields is required" });
  }
  try {
    const productDoc = await ProductModel.create({
      name,
      description,
      category,
      price,
      image: firebaseUrl,
    });
    if (!productDoc) {
      res.status(404).send({
        message: "Cannot create new product!",
      });
      return;
    }
    res.json(productDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while creating new product",
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find()
    //SELECT * FROM , USER WHERE POST.author = USER._id
    if (!products) {
      res.status(404).send({
        message: "Product not found!",
      });
      return;
    }
    res.json(products);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while retrieving products",
    });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const productDoc = await ProductModel.findById(id);
    if (!productDoc) {
      res.status(404).send({
        message: "Product not found!",
      });
      return;
    }
    res.json(productDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Something error occurred while getting product details",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productDoc = await ProductModel.findById(id);
    if (!productDoc) {
      res.status(404).send({
        message: "Product not found!",
      });
      return;
    }
    await productDoc.deleteOne();
    res.json(productDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while deleting a product",
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ message: "Product id is not provided" });

  try {
    const productDoc = await ProductModel.findById(id);
    if (!productDoc) {
      res.status(404).send({
        message: "Product not found!",
      });
      return;
    }
    const { name, description, category, price } = req.body;
    if (!name || !description || !category || !price) {
      return res.status(400).json({ message: "All Fields is required" });
    }
    productDoc.name = name;
    productDoc.description = description;
    productDoc.category = category;
    productDoc.category = price;
    if (req.file) {
      const path = req.file.firebaseUrl;
      productDoc.image = path;
    }
    await productDoc.save();
    res.json(productDoc);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message:
        error.message || "Something error occurred while updating a product",
    });
  }
};