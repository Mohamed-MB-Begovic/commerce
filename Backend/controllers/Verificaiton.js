import Verification from "../models/VerificationSchema"

export default verifyCode=async(req,res)=>{
    const {code}=req.body
    try {
        const record=await Verification.findOne({_id:req.user._id,code})
        if(record){
            await Verification.deleteOne({_id:req.user._id})
        }
    } catch (error) {
        console.log('error in verifying code'+error)
    }
}