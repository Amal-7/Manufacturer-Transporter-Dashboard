import { loginHelperTransporter, signUpHelper } from "../models/helpers/transporterHelper.js"



const transporterSignUp =async (req,res) => {
   const data = req.body
   signUpHelper(data).then((response) => {
        res.json(response)
   }).catch((err) => {
    res.json(err)
   })
}


const transporerLogin = (req,res) => {
    const data = req.body
    loginHelperTransporter(data).then((response) => {
        res.json(response) 
    }).catch((err) => {
        res.json(err)
    })
}
 



export {
    transporterSignUp,transporerLogin
}