import express from "express";
import order from './order.js'
import products from './products.js';
import user from './user.js';

const router = express.Router();

router.use('/user',user);
router.use('/order',order)
router.use('/products',products)

export default router;