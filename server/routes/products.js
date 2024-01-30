import express from "express";
import { products } from "../constants/index.js";
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.send(products);
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, message: "Internal server error", error });
  }
});
router.get('/:id',(req,res)=>{
    const productId = parseInt(req.params.id);

  // Find the product with the given ID
  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).send({ error: 'Product not found' });
  }

  res.send(product);
})
router.get("/category/:category", (req, res) => {
  try {
    const category = req.params.category.toLowerCase();

    // Filter products based on the given category
    const filteredProducts = products.filter(
      (product) => product.category.toLowerCase() === category
    );

    res.send(filteredProducts);
  } catch (error) {
    res
      .status(500)
      .send({ status: 500, message: "Internal server error", error });
  }
});

export default router;
