import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    favourite: [
      {
        type: mongoose.Types.ObjectId,
        ref: "BookModel",
      },
    ],
    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "BookModel",
      },
    ],
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "OrderModel",
      },
    ],
  },
  { timestamps: true }
);

const UserModel= mongoose.model("UserModel", UserSchema);
export default UserModel;
