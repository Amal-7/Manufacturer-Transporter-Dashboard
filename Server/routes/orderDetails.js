import  express from "express";
import { messages, orders, transporterOrder } from "../controllers/orderController.js";
import verifyToken from "../models/helpers/jwt/verifyToken.js";
var router = express.Router()

router.get('/',verifyToken, orders)

router.get('/transporter',verifyToken,transporterOrder)


router.get('/messages',verifyToken,messages)


export default router