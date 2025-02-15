import Mongoose from "mongoose";
import validator from "validator";

const { Schema } = Mongoose;
const userModel = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      toLowerCase: true,
      validate: [validator.isEmail, "please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      // required: true,
      default: "user",
    },
    cartProducts:[String],
    registeredDate:{
      type:Date,
      default:new Date().toLocaleDateString()
    },
    image: {
      type: String,
      // required: true,
      default: null,
    },
  
  },
  { timestamps: true }
);

const Users = Mongoose.model("Users", userModel);

export default Users;