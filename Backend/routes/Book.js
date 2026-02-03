import express from "express";
import UserAuth from "../Middleware/UserAuth.js";
import upload from "../Middleware/Multer.js";
import {
  AddBook,
  UpdateBook,
  DeleteBook,
  GetAllBooks,
  GetRecentBooks,
  GetBookById,
} from "../controller/Book.js";

const Bookrouter = express.Router();

//create book -- admin
Bookrouter.post("/add-book", UserAuth, upload.single("url"), AddBook);

//update book --admin
Bookrouter.put("/update-book", UserAuth, UpdateBook);

//delete book --admin
Bookrouter.delete("/delete-book", UserAuth, DeleteBook);

//get all books
Bookrouter.get("/get-all-books", GetAllBooks);

//get recently added books
Bookrouter.get("/get-recent-books", GetRecentBooks);

//get book by id
Bookrouter.get("/get-book-by-id/:id", GetBookById);

export default Bookrouter;
