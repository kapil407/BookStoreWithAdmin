import express from  "express";

import UserAuth from "../Middleware/UserAuth.js";
import { AddToCart ,GetUserCart,RemoveFromCart} from "../controller/Cart.js";

const CartRouter=express.Router();
//add to cart
CartRouter.put("/add-to-cart", UserAuth, AddToCart);

//get cart of a particular user
CartRouter.get("/get-user-cart", UserAuth, GetUserCart);

//remove from cart
CartRouter.put("/remove-from-cart/:bookid", UserAuth, RemoveFromCart);

export default CartRouter ;