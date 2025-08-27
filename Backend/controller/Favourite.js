

import UserModel from "../models/UserModel.js";

//add favourite book to user model
export const  AddToFavourite= async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await UserModel.findById(id);
    const isBookFavorited = userData.favourite.includes(bookid);
    if (isBookFavorited) {
      return res.json({
        status: "Success",
        message: "Book is already in favourites",
      });
    }
    await UserModel.findByIdAndUpdate(id, {
      $push: { favourite: bookid },
    });

    return res.json({
      status: "Success",
      message: "Book added to favourites",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

//get Favourite books of a particular user
export const GetFavouriteBooks= async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await UserModel.findById(id).populate("favourite");
    const favouriteBooks = userData.favourite;
    return res.json({
      status: "Success",
      data: favouriteBooks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

//remove from favourites
export const RemoveFromFavourite= async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    await UserModel.findByIdAndUpdate(id, {
      $pull: { favourite: bookid },
    });

    return res.json({
      status: "Success",
      message: "Book removed from favourites",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

