import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory:[],
    price: {
        type: Number,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    soldItems:{
        type:Number,
        default:0
    },
    // sku: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // weight: {
    //     type: Number
    // },
    thumbnail:{type:String},
    // dimensions: {
    //     length: Number,
    //     width: Number,
    //     height: Number
    // },
    // images: {
    //     type: [String] // Array of image URLs
    // },
    discount: {
        type: Number,
        default: 0
    },
    ratings: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: {
        type: [String] // Array of review texts
    },
    // supplier: {
    //     name: String,
    //     contact: String
    // },
    warranty: {
        type: String
    },
    returnPolicy: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ['in stock', 'out of stock', 'discontinued'],
        default: 'in stock'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"Users",
        required:true
    }
});

const Product = mongoose.model('Products', productSchema);

export default Product;