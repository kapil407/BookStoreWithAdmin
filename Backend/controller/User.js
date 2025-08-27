

import bcrypt from 'bcryptjs'
import UserModel from '../models/UserModel.js';
import jwt from "jsonwebtoken"
import validator from 'validator';

//Sign - u
 export const SignUp= async (req, res) => {
  try {
    // Validate username format
    const usernameLength = req.body.username.length;
    if (usernameLength < 4) {
      return res.status(400).json({
        status: "Error",
        message: "Username must have atleast 4 characters.",
      });
    }

    // Validate email format
   

const email = req.body.email;
if (!validator.isEmail(email)) {
  return res.status(400).json({ message: "Invalid email address" });
}

    //Check the length of password
    const password = req.body.password;
    const passLength = password.length;
    if (passLength < 6) {
      return res.status(400).json({
        status: "Error",
        message: "Password must be 6 characters long",
      });
    }
    // Check username or email already exists
    const usernameExists = await UserModel.findOne({ username: req.body.username });
    const emailExists = await UserModel.findOne({ email: req.body.email });
    if (usernameExists || emailExists) {
      return res.status(400).json({
        status: "Error",
        message: usernameExists
          ? "Username already exists"
          : "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      address: req.body.address,
    });

    await user.save();
    return res.json({
      status: "Success",
      message: "Signup successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: "Internal server error",
    });
  }
};

//login
 export const Login=async (req, res) => {
  try {
   
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    console.log("userId",user._id);
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    bcrypt.compare(password, user.password, (err, data) => {
      if (data) {
        const authClaims = [
          { name: user.username },
          { role: user.role },
          { jti: jwt.sign({}, "bookStore123") },
        ];
        const token = jwt.sign({ authClaims }, "bookStore123", {
          expiresIn: "30d",
        });

        res.json({
          _id: user._id,
          role: user.role,
          token,
        });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    });

   
  } catch (error) {
    return res.status(400).json({ message: "Internal Error" });
  }
};

//Get Users (individual) Profile Data
export const getUserData= async (req, res) => {
  try {
    const { id } = req.headers;

    const data = await UserModel.findById(id);
    console.log("data->",data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred in profile" });
  }
};

//Update address
export const UpdateUserAddress= async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await UserModel.findByIdAndUpdate(id, { address });
    return res.status(200).json({
      status: "Success",
      message: "Address updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

