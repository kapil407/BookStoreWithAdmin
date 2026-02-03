import React, { useState } from "react";
import axios from "axios";
import { FaImage } from "react-icons/fa";
const AddBook = () => {
  const [author, setAuther] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDecrip] = useState("");
  const [language, setLanguage] = useState("");
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const submit = async () => {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("url", url);
    formData.append("price", price);
    formData.append("desc", desc);
    formData.append("language", language);
    try {
      console.log(title);
      console.log(author);
      console.log(price);
      console.log(desc);
      console.log(language);
      console.log(url);

      const response = await axios.post(
        "http://localhost:1000/api/v1/add-book",
        formData,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      // (error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className=" text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Add Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <input
            type="file"
            id="uploadImage"
            className="hidden"
            required
            onChange={(e) => setUrl(e.target.files[0])} // file object store
          />
          <label
            htmlFor="uploadImage"
            className="text-xl text-blue-200 cursor-pointer"
          >
            Select image
          </label>
          <FaImage className="text-2xl text-blue-200 cursor-pointer" />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Title of book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="title of book"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Author of book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="author of book"
            name="author"
            required
            value={author}
            onChange={(e) => setAuther(e.target.value)}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Language
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="language of book"
              name="language"
              required
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <div className="w-3/6">
            <label htmlFor="" className="text-zinc-400">
              Price
            </label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="price of book"
              name="price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Description of book
          </label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none "
            rows="5"
            placeholder="description of book"
            name="desc"
            required
            value={desc}
            onChange={(e) => setDecrip(e.target.value)}
          />
        </div>

        <button
          className=" mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
          onClick={submit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
