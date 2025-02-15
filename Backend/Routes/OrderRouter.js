import express from 'express'
import { addOrder,getOrders ,updateStatus,verifyCode,getUserOrders,getUserOrder
} from '../controllers/Orders.js';
import {Authenticate} from '../middleware/Authenticate.js'

const OrderRouter=express.Router();

OrderRouter.route('/')
.post(Authenticate,addOrder)
.get(Authenticate,getOrders)

OrderRouter.route('/verify')
.post(Authenticate,verifyCode)

OrderRouter.route('/user')
.get(Authenticate,getUserOrders)
OrderRouter.route('/user/:id')
.get(Authenticate,getUserOrder)

OrderRouter.route('/:id')
.post(Authenticate,updateStatus)
export default OrderRouter;