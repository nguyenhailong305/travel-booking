import express from 'express';
import {createReview } from './../controller/reviewController.js'

const router = express.Router()

import {verifyUser} from '../utils/verifyToken.js';
//create new tour
router.post('/:tourId'  ,verifyUser , createReview);




export default router ;