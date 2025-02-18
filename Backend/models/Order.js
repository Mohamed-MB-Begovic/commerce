// models/checkoutModel.js
// const mongoose = require('mongoose');
import Mongoose from 'mongoose'
import mongooseSequence from "mongoose-sequence";
// import Autoincrement from 'mongoose'
// Define a schema for the checkout form data
const { Schema } = Mongoose;

const checkoutSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    apartment: {
      type: String,
      required: false, // Optional field
    },
    country: {
      type: String,
      required: true,
      default: 'Somalia', // Default value
    },
    paymentMethod: {
      type: String,
      required: true,
    },
   subtotal: {
        type: Number,
        required: true,
   
      shippingFee: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
        default: 0,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
    },
    status:{
      type:String,
      default:"processing"
    },
    user:{
      type:Schema.Types.ObjectId,
      ref:"Users"
    },
    email:{
      type:String
    },
    orderItems: [
      {
        productId: {
          type: Mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        size:{
          type:String,
          required:true
        },
        productImage:{
          type:String
        }
      },
    ],
  },
  { timestamps: true }
);

// Create the model based on the schema
checkoutSchema.plugin(mongooseSequence(Mongoose), { inc_field: "ID" });
const Checkout = Mongoose.model('Checkout', checkoutSchema);
export default Checkout;
