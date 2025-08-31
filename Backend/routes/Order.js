import { GetAllOrders, GetOrderHistory, PlaceOrder, UpdateStatus } from "../controller/Order.js";
import UserAuth from "../Middleware/UserAuth.js";
import express from 'express'
const OrderRouter=express.Router();
//place order
OrderRouter.post("/place-order", UserAuth, PlaceOrder);

//get order history of particular user
OrderRouter.get("/get-order-history", UserAuth,GetOrderHistory);

//get-all-orders ---admin
OrderRouter.get("/get-all-orders", UserAuth, GetAllOrders);

//update order --admin
OrderRouter.put("/update-status/:id", UserAuth,UpdateStatus);
export default OrderRouter;
