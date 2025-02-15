import express from 'express'
import {verifyCode} from '../controllers/Verificaiton.js'
const verificationRouter=express.Router()
import {Authenticate} from '../middleware/Authenticate.js'

verificationRouter.post('/verify',Authenticate,verifyCode)