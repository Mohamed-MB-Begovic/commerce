import Checkout from "../models/Order.js";
import User from "../models/Users.js";

export const getpayments=async (req,res)=>{
    // console.log("payments")
    try {
        
        
        const data=await Checkout.find()
        res.status(200).send(data)
        // console.log(data)
    } catch (error) {
        console.log('error in get users : ',error)
    }
}


export const getTotalPayments= async (req, res) => {
  try {
    // Fetch all payments
    const payments = await Checkout.find();
    const customers = await User.countDocuments();

    // Calculate total payment amount
    const totalPayment = payments.reduce((sum, payment) => sum + payment.subtotal, 0);
    const topCustomers=await Checkout.find().sort({subtotal:-1}).limit(5)

//    
//     // Return response
     res.json({
       total_payment: totalPayment,
       totalCustomers:customers,
topCustomers
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching payments.' });
  }
};


 
  