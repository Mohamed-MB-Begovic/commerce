import express from 'express'
import { getUsers, loginUser, registerUser ,updateUser} from '../controllers/Users.js';
import {Authenticate} from '../middleware/Authenticate.js'
import upload from '../middleware/Upload.js'

const UserRouter=express.Router();

UserRouter.route('/')
.get(getUsers)
.post(registerUser)



UserRouter.route('/login')
.post(loginUser)

UserRouter.route('/:id')
.post(Authenticate,upload.single('image'),updateUser)

export default UserRouter;