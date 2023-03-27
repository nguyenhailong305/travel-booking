import express from 'express';
import {createBooking, getAllBooking, getBooking} from './../controller/bookingController.js'

const router = express.Router()

import {verifyAdmin, verifyUser} from '../utils/verifyToken.js';
//create new tour
router.post('/'  ,verifyUser , createBooking);
router.get('/:id'  ,verifyUser , getBooking);
router.get('/'  , verifyAdmin , getAllBooking);




export default router ;