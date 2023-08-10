import express from 'express' ; 
import { transporerLogin, transporterSignUp } from '../controllers/transporterController.js';
var router = express.Router()


// signUp
router.post('/',transporterSignUp)

// Login
router.post('/login',transporerLogin)




export default router