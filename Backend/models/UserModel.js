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
    image: {
      type: String,
      default: "",
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
