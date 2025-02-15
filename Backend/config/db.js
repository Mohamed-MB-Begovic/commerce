import mongoose from 'mongoose'
import { DB_URL } from './config.js'


 const Connect=async()=>{
    try {
        await mongoose.connect(DB_URL)
        console.log('connection success using '+DB_URL)
    } catch (error) {
        console.log('connection error '+error)
    }
 }

export default Connect;