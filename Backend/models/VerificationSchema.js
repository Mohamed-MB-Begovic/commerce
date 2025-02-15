import mongoose from 'mongoose'

const verificationSchema=new mongoose.Schema({
    userId:String,
    email:String,
    code:String,
    createdAt:{type:Date,default:Date.now(),expires:"1800"}
})


const Verification=mongoose.model('Verification',verificationSchema)

export default Verification;