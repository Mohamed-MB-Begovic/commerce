import express from 'express'
import { DeleteProduct, filtering, getProducts,getMens,getWomens,getProduct, registerProduct, getKids } from '../controllers/Products.js';
import upload from '../middleware/Upload.js'
import {Authenticate} from '../middleware/Authenticate.js'
const Products=express.Router();

Products.route('/')
.get(Authenticate,getProducts)
// .post(registerProduct)
.post(Authenticate,upload.single('thumbnail'),registerProduct)
// .post(upload.array('images',5),registerProduct)

Products.route('/view/:tabname')
.get(Authenticate,filtering)

Products.route('/womens')
.get(Authenticate,getWomens)
Products.route('/kids')
.get(Authenticate,getKids)
 

Products.route('/mens')
.get(Authenticate,getMens)
 
Products.route('/:id')
.get(Authenticate,getProduct)
.delete(Authenticate,DeleteProduct)


export default Products;