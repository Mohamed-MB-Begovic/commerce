import cloudinary from '../config/Cloudinary.js'
import Product from '../models/product.js'
export const getProducts=async(req,res)=>{
  try {
    // console.log('get request')
    const data=await Product.find().sort({dateAdded: -1})
    // console.log(data)
  res.status(200).send(data)
  } catch (error) {
    console.log('error in get products'+error)
  }
}


export const registerProduct=async(req,res)=>{
  const currentUser = req.user._id;
  let result;
  const Category=req.body.subCategory.split(',')
  try{
    if (req.file) {
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
      "base64"
    )}`;
    // console.log(encodedImage);
    result = await cloudinary.uploader.upload(encodedImage, {
      resource_type: "image",
      transformation: [{ width: 500, height: 500, crop: "limit" }],
      encoding: "base64",
    });
    req.body.thumbnail=result.url
  }
  req.body.subCategory=Category
  // console.log(req.body)
  const newProduct=new Product({...req.body,user:currentUser})
  await newProduct.save();
  // console.log(newProduct)
  res.status(201).send(newProduct)
}catch (error) {
        console.log(error)
    }
}

 

export const DeleteProduct=async (req,res)=>{
  console.log(req.params.id)
  try {
   const data= await Product.deleteOne({_id:req.params.id})
  //  console.log(data)
   res.status(200).send('deleted successfully')
  //  console.log(data)
  } catch (error) {
    console.log('error in deleting data'+error)
    res.status(404).send(error)
  }
}


// tabs

export const filtering = async(req,res)=>{
  // console.log(req.params.tabname)
// console.log('roosle and ali')
try {
  const data= await Product.find({subCategory:{$in :'Men'}})
  res.status(201).send(data)
  // console.log(data)
} catch (error) {
  console.log(error)
  res.status(404).send(error)
}
}

export const getProduct = async(req,res)=>{
  // console.log(req.params.id)
try {
  const data= await Product.find({_id:req.params.id})
  // console.log(data)
  // const relatedProducts= await Product.find({subCategory:{$in :data[0].subCategory},_id: { $ne: req.params.id }}).limit(4).exec()
  const relatedProducts = await Product.aggregate([
    // Step 1: Match products with the same category, excluding the current product
    {
      $match: {
        subCategory:{$in :data[0].subCategory},
        _id: { $ne: req.params.id }, // Exclude the current product
      },
    },
    // Step 2: Randomly shuffle the results
    {
      $sample: { size: 4 }, // Adjust this number as per your needs (e.g., 4 related products)
    },
    // Step 3: Optionally, project only the needed fields (like name, image, price)
    // {
    //   $project: {
    //     name: 1,
    //     price: 1,
    //     image: 1,
    //   },
    
    // },
  ]);
  
// console.log(relatedProducts)
// const relatedProducts = await Product.find({ category: data.category }).limit(4).exec();
    // res.status(201).send(data,relatedProducts);
    res.json({relatedProducts,data})
    // console.log(relatedProducts)
} catch (error) {
  console.log(error)
  res.status(404).send(error)
}
}
export const getWomens = async(req,res)=>{
  // console.log(req.body)
try {
  const data= await Product.find({subCategory:{$in :'women'}})

  res.status(201).send(data)
  // console.log(data)
} catch (error) {
  console.log(error)
  res.status(404).send(error)
}
}
export const getKids = async(req,res)=>{
  // console.log(req.body)
try {
  const data= await Product.find({category:'Kids'})
  res.status(201).send(data)
  // console.log(data)
} catch (error) {
  console.log(error)
  res.status(404).send(error)
}
}
export const getMens = async(req,res)=>{
  console.log(req.body)
try {
  const data= await Product.find({category:"Men"})
  res.status(201).send(data)
  // console.log(data)
} catch (error) {
  console.log(error)
  res.status(404).send(error)
}
}
