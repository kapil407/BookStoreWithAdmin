import express from "express";

import UserAuth from "../Middleware/UserAuth.js";
import {
  AddToFavourite,
  GetFavouriteBooks,
  RemoveFromFavourite,
} from "../controller/Favourite.js";

const FavouriteBookRouter = express.Router();

FavouriteBookRouter.put("/add-to-favourite", UserAuth, AddToFavourite);
//get Favourite books of a particular user
FavouriteBookRouter.get("/get-favourite-books", UserAuth, GetFavouriteBooks);

//remove from favourites
FavouriteBookRouter.put(
  "/remove-from-favourite",
  UserAuth,
  RemoveFromFavourite,
);

export default FavouriteBookRouter;
