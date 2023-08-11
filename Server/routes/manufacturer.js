import express from 'express' ;
import { getTransportersList, manufacturerLogin, signUpManufacturer } from '../controllers/manufacturerController.js';
import verifyToken from '../models/helpers/jwt/verifyToken.js';
var router = express.Router()

// SignUp
router.post('/' ,signUpManufacturer)


// Login
router.post('/login' ,manufacturerLogin)

// get transportersList
router.get('/getTransporters',verifyToken,getTransportersList)






export default router