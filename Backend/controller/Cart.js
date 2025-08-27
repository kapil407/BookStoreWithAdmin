import UserModel from "../models/UserModel.js";




export const  AddToCart= async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await UserModel.findById(id);
    const isBookFavorited = userData.cart.includes(bookid);
    if (isBookFavorited) {
      return res.json({
        status: "Success",
        message: "Book is already in cart",
      });
    }
    await UserModel.findByIdAndUpdate(id, {
      $push: { cart: bookid },
    });

    return res.json({
      status: "Success",
      message: "Book added to cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

//get cart of a particular user
export const  GetUserCart= async (req, res) => {
  try {
    const { id } = req.headers;
   
    const userData = await UserModel.findById(id).populate("cart");
    //  console.log("userData->>>>",userData);
    const cart = userData?.cart?.reverse();
    // console.log("cart->> ",cart);
     
    return res.json({
      status: "Success",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

//remove from cart
export const RemoveFromCart=async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    await UserModel.findByIdAndUpdate(id, {
      $pull: { cart: bookid },
    });

    return res.json({
      status: "Success",
      message: "Book removed from cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

