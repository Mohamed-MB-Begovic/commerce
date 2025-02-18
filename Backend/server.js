import path from 'path'
import express from 'express'
import Connect from './config/db.js';
import UserRouter from './Routes/UserRouter.js';
import CookieParser from 'cookie-parser'
 
import cors from 'cors'
import { DeleteProduct, getProducts } from './controllers/Products.js';
import Products from './Routes/products.js';
import OrderRouter from './Routes/OrderRouter.js';
import PaymentRouter from './Routes/PaymentRouter.js';
import dotenv from 'dotenv'
const app=express();
 dotenv.config();
app.use(express.json())
app.use(CookieParser())
// app.use(cors())
// user routes
app.use('/api/users',UserRouter)
app.use('/api/products',Products)
app.use('/api/payments',PaymentRouter)
app.use('/api/orders',OrderRouter)



const __dirname=path.resolve()


    app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
})
// connection
Connect();
// server
app.listen(9000,()=>{
    console.log('app is listening port 9000')
})