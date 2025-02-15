import { JWT_SECRET } from "../config/config.js"
import Users from "../models/Users.js"
import jwt from 'jsonwebtoken'
import cloudinary from "../config/Cloudinary.js";

export const getUsers=async (req,res)=>{
    try {
        const data=await Users.find()
        // console.log(data)
    } catch (error) {
        console.log('error in get users : ',error)
    }
}

export const registerUser=async(req,res)=>{
    try {
        const {email,username,password}=req.body
        const EmailCheck=await Users.findOne({email:email})
        if(EmailCheck)return res.status(404).send('Email already exist')
        
            const newUser=new Users({
                email:email,
                username:username,
                password:password
            })
            await newUser.save();

            res.status(201).send(newUser)




    } catch (error) {
        console.log('error in creating user: ',error)
        res.status(404).send(error.message)
    }
}
export const loginUser=async(req,res)=>{
  // console.log('login user')
    try {
        const {email,password}=req.body
   
        const userExists=await Users.findOne({email:email})
        if(!userExists)return res.status(404).send('Invalid Email or Password')
        
            // const newUser=new Users({
            //     email:email,
            //     username:username,
            //     password:password
            // })
            const expiresIn=7*24*60*60
            const token=jwt.sign({_id:userExists.id},JWT_SECRET,{
                expiresIn
            })

            res.cookie('token',token,{
                httpOnly:true,
                maxAge:expiresIn *1000,
                secure:false
            })
            // res.status(200).send("login success")
            res.status(200).send({...userExists.toJSON(),expiresIn})
    } catch (error) {
        console.log('error in Login user: ',error)
        res.status(404).send(error)
    }
}

export const updateUser = async (req, res, next) => {
//   console.log('yes')
// console.log(req.params.id)
// console.log(req.body)
  const updatedFields = {};
  const email = req.body?.email;
  if (email) {
    updatedFields.email = email;
  }
  const username = req.body?.username;
  if (username) {
    updatedFields.username = username;
  }
  const password = req.body?.password;
  if (password) {
    updatedFields.password = password;
  }
// console.log(req.body.image)
  let result;
  // console.log(req)
  if (req.file) {
    // console.log("yes there is a file");
    try{
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;
      // console.log(encodedImage);
      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        encoding: "base64",
       }) 
      //  console.log(result)
       updatedFields.image = result.url;
      }catch(err){
      // console.log('error in ')
      console.log('error in uploading image'+err)
  };
    
  }

  try {
    const user = await Users.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });
    if (!user) return res.status(400).send("user not found");
    const UserUpdated = await Users.findOne({
      _id: req.params.id,
    });
  
    res.status(200).send({ ...UserUpdated.toJSON() });
    // console.log(UserUpdated);
    // res.status(200).send("update successfully");
    // res.status(200).json({
    //   message: "user updated successfully",
    // });
  } catch (error) {
    console.log(error);
  }
};

    // console.log(req.body);
  //   let updatedFields = {
  //     status: req.body.orderStatus,
  //   };
  
  //   try {
  //     const order = await Checkout.findByIdAndUpdate(req.params.id, updatedFields, {
  //       new: true,
  //     });
  //     if (!order) return res.status(400).send("order not found");
  //     // console.log(order);
  //     res.status(200).json({
  //       message: "order updated successfully",
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };