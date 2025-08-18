import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "BookModel",
    },
    status: {
      type: String,
      default: "Order placed",
      enum: ["Order placed", "Out for delivery", "Delivered", "Canceled"],
    },
  },
  { timestamps: true }
);

const OrderModel= mongoose.model("OrderModel", OrderSchema);
export default OrderModel ;