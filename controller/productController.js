import Product from "../models/productModel.js"
export const addProduct = async (req, res) => {
  try {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).send({ error: "Invalid or empty product array." });
    }

    await Product.bulkCreate(products, { validate: true });

    return res.status(201).send({ message: "Products added successfully." });
  } catch (error) {
    console.error("Error adding products:", error.message);
    return res
      .status(500)
      .send({ error: "An error occurred while adding products." });
  }
};
