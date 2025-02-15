import Checkout from "../models/Order.js";
import Product from "../models/product.js";
import Users from "../models/Users.js";
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import Verification from "../models/VerificationSchema.js";
// import Checkout from '../models/Order.js'
dotenv.config();


// function generating verification code
const generateVerificationCode=()=>{
  return Math.floor(100000+Math.random()*900000) //this generates a random six digt code
}


// // function of sending verification email
const sendVerificationEmail = async (userEmail, code, orderedProducts) => {
  // console.log("send verification")
  // console.log(userEmail)
  // console.log(orderedProducts)
//  const user= process.env.EMAIL_USER// Your email
//                     const pass=process.env.EMAIL_PASS  
//                     console.log(user,pass)
  try {
    // Configure transporter
    const transporter = nodemailer.createTransport({
              service: 'gmail', // or use another email service (e.g., Outlook, Yahoo)
              auth: {
                  user: process.env.EMAIL_USER, // Your email
                  pass: process.env.EMAIL_PASS  // App-specific password or SMTP password
              }
          
            });

    // Format ordered products
    const productDetails = orderedProducts.map(product => `
      <div style="margin-bottom: 10px;">
        <h4 style="margin: 0;">${product.name}</h4>
        <img src="${product.thumbnail}" alt="${product.name}" style="width: 100px; height: auto;" />
        <p>Size: ${product.size}</p>
        <p>Price: $${product.price}</p>
      </div>
      
    `).join('');

    // Calculate total price
    const totalPrice = orderedProducts.reduce((total, product) => total + product.price, 0);

    // Email options
    const mailOptions = {
      from: "mohamedmohamudabdulahiabdi@gmail.com",
      to: userEmail,
      subject: "Your order verification code",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <p>Your verification code is: <strong>${code}</strong></p>
          <p>This code will expire after 30 minutes.</p>
          <h3>Ordered Products:</h3>
          ${productDetails}
          <h3>Shipping Fee:${orderedProducts.length*0.5}</h3>
          <h3>Total Price: $${totalPrice+(orderedProducts.length*0.5)}</h3>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error in sending verification email: ' + error);
  }
}
// const sendVerificationEmail=async(userEmail,code)=>{
//   try {
//        //  Configure transporter
//        const transporter = nodemailer.createTransport({
//         service: 'gmail', // or use another email service (e.g., Outlook, Yahoo)
//         auth: {
//             user: process.env.EMAIL_USER, // Your email
//             pass: process.env.EMAIL_PASS  // App-specific password or SMTP password
//         }
    
//       });

//         // Email options
//   const mailOptions = {
//     from: userEmail,
//     to:"mohamedmohamudabdulahiabdi@gmail.com",
//     subject:"your order verification code is ",
//     text:`your verification code is  
//      ${code} 
//     this code will expire after 30 minutes
//     `
// };

//  // Send email
//  await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.log('error in sending verification email:  '+error)
//   }
// }

export const verifyCode=async(req,res)=>{
  // console.log("is heppening")
  const {code}=req.body
//  console.log(req.body)
  try {
      const record=await Verification.findOne({userId:req.user._id,code})
      // console.log(record)
      if(!record)return res.status(404).send("invalid confirmation code")
      const data={...req.body}
      data.user=req.user._id
      const newCheckout=new Checkout(data)
      await newCheckout.save();
      // console.log(newCheckout)
  res.status(201).json({ message:  'your order has been sent successfully', data: newCheckout})
        // await Verification.deleteOne({_id:req.user._id})
        await Verification.deleteOne({userId:req.user._id})
         
  } catch (error) {
      console.log('error in verifying code'+error)
  }
}


export const addOrder=async(req,res)=>{
try{
// console.log("add order happend")
    let data={...req.body}
    const code=generateVerificationCode();
    data.userId=req.user._id
    data.code=code;

    const newVerification=new Verification({
      userId:req.user._id,
      email:req.user.email,
      code
    })
  // send verification email
  // sendVerificationEmail(req.userEmail,code)
  sendVerificationEmail(req.body.email,code,req.body.products)
  await newVerification.save();
  // send this data to the order 
  // const newCheckout=new Checkout(data)

   // Save the new checkout to the database
  // await newCheckout.save();
  // / Send a response back to the client
  res.status(201).json({ message: 'Checkout created successfully'})

} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error', error: error.message });
}
}

// get order
export const getOrders=async(req,res)=>{
  try {
    // console.log('get request')
    const data=await Checkout.find().sort({createdAt:-1})
    // console.log(data)
  res.status(200).send(data)
  } catch (error) {
    console.log('error in get orders'+error)
  }
}

// // update order status

export const updateStatus = async (req, res, next) => {
  // console.log(req.body);
  let updatedFields = {
    status: req.body.orderStatus,
  };

  try {
    const order = await Checkout.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });
    if (!order) return res.status(400).send("order not found");
    // console.log(order);
    res.status(200).json({
      message: "order updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// get orders
export const getUserOrders=async(req,res)=>{
  try {
    // console.log('get request')
    const data=await Checkout.find({user:req.user._id}).sort({createdAt:-1})
    // console.log(data)
  res.status(200).send(data)
  } catch (error) {
    console.log('error in get orders'+error)
  }
}
// get order
export const getUserOrder=async(req,res)=>{
  // console.log(req.params)
  try {
    // console.log('get request')
    const data=await Checkout.find({user:req.user._id,_id:req.params.id}).sort({createdAt:-1})
    // console.log(data)
  res.status(200).send(data)
  } catch (error) {
    console.log('error in get orders'+error)
  }
}

 



// export const verifyCode = async (req, res) => {
//   // Your existing verifyCode logic
// }