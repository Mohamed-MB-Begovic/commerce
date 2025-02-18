import express from 'express'
// import { getpayments} from '../controllers/Payments.js';
import {Authenticate} from '../middleware/Authenticate.js'
import { getpayments, getTotalPayments } from '../controllers/Payments..js';
// import upload from '../middleware/Upload.js'

const PaymentRouter=express.Router();

PaymentRouter.route('/')
.get(getpayments)
 
 PaymentRouter.route('/total')
 .get(getTotalPayments);
export default PaymentRouter;