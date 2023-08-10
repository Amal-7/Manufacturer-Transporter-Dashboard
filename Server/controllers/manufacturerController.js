import { manufacturerSignUp ,loginHelper, getTransportersHelper} from "../models/helpers/manufacturerHelper.js"


const signUpManufacturer =async(req,res) => {

   const data = req.body
   manufacturerSignUp(data).then((response) => {
        res.json(response)
   }).catch((error) => {
    res.json(error)
   })
    
}

const manufacturerLogin = (req,res) => {
    const data = req.body
    loginHelper(data).then((response) => {
        res.json(response)
    }).catch((err) => {
        res.json(err)
    })

}

const getTransportersList = (req,res) => {
    getTransportersHelper().then((respone) => {
        res.json(respone)
    }).catch((err) => {
        res.json(err)
    })
}



export {
    signUpManufacturer,manufacturerLogin,getTransportersList
}