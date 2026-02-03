import BookModel from "../models/BookModel.js";
// import User from "../models/UserModel.js";
import uploadCloudinary from "../Middleware/Cloudinary.js";
//create book -- admin
export const AddBook = async (req, res) => {
  try {
    let Imageurl;

    if (req.file) {
      console.log("file", req.file);
      const image = await uploadCloudinary(req.file);
      Imageurl = image;
    }
    const book = new BookModel({
      url: Imageurl,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    await BookModel.save();
    return res.json({
      status: "Success",
      message: "Book added successfully!",
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "kapil An error occurred" });
  }
};

//update book --admin
export const UpdateBook = async (req, res) => {
  try {
    const { bookid } = req.headers;
    await BookModel.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });

    return res.json({
      status: "Success",
      message: "Book Updated successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

//delete book --admin
export const DeleteBook = async (req, res) => {
  try {
    const { bookid } = req.headers;
    await BookModel.findByIdAndDelete(bookid);
    return res.json({
      status: "Success",
      message: "Book deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

//get all books
export const GetAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find().sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

//get recently added books
export const GetRecentBooks = async (req, res) => {
  try {
    const books = await BookModel.find().sort({ createdAt: -1 }).limit(4);
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

//get book by id
export const GetBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);
    return res.json({
      status: "Success",
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};
