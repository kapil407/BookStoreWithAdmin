import UserModel from '../models/UserModel.js';

import BookModel from '../models/BookModel.js';
import OrderModel from '../models/OrderModel.js';

//place order
export const PlaceOrder=async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;
    for (const orderData of order) {
      const newOrder = new OrderModel({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();
      //saving Order in user model
      await UserModel.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });
      //clearing cart
      await UserModel.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }
    return res.json({
      status: "Success",
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

//get order history of particular user
export const GetOrderHistory= async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await UserModel.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    const ordersData = userData.orders.reverse();
    return res.json({
      status: "Success",
      data: ordersData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

//get-all-orders ---admin
export const GetAllOrders= async (req, res) => {
  try {
    const userData = await OrderModel.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

//update order --admin
export const UpdateStatus= async (req, res) => {
  try {
    const { id } = req.params;
    await OrderModel.findByIdAndUpdate(id, { status: req.body.status });
    return res.json({
      status: "Success",
      message: "Status Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

