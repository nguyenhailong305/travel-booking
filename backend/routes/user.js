import express from 'express';
import {createUser, deleteUser, getAllUser,  getSingleUser, updateUser} from './../controller/userController.js'

const router = express.Router()

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
//update User
router.put('/:id' ,verifyUser, updateUser);
//delete User
router.delete('/:id' ,verifyUser , deleteUser);
//get single User
router.get('/:id' ,verifyUser , getSingleUser);
//get all User
router.get('/' ,verifyAdmin , getAllUser);

export default router ;