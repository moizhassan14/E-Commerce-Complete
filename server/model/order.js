import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema({
  user: {
    _id: {
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
    },
    email: {
      type: Schema.Types.String,
      ref: "User", 
      required: true,
    },
  },
  userDetails: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String, // Changed from Number to String
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  cart: [
    {
      id: {
        type: Number,
      },
      title: {
        type: String,
      },
      price: {
        type: Number,
      },
      description: {
        type: String,
      },
      category: {
        type: String,
      },
      image: {
        type: String,
      },
      rating: {
        type: [Object],
      },
      qty: {
        type: Number,
      },
    },
  ],
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
