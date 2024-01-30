import express from "express";
import Order from "../model/order.js";

const router = express.Router();

router.post('/',(req, res) => {
  console.log(req.body);
  const { user, userDetails, cart } = req.body;
    const newOrder = new Order({
      user,
      userDetails,
      cart,
    });
  
    newOrder.save()
      .then(() => {
        console.log('Order saved successfully');
        res.status(201).json({ message: 'Order placed successfully' });
      })
      .catch(error => {
        console.error('Error saving order:', error);
        res.status(500).json({ error: 'Internal server error' });
      });

});

export default router;
