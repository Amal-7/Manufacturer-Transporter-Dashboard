
import Manufacturer from '../schemas/manufacturerSchema.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import Transporter from '../schemas/transporterSchema.js'


const manufacturerSignUp = (user) => {

    return new Promise(async(resolve,reject) => {

        user.password = await bcrypt.hash(user.password,10)

        const newUser= new Manufacturer({
            fullName : user.fullName ,
            email : user.email,
            password : user.password,
            address : user.address,
            role : user.role
        
        })
    
       newUser.save().then(savedUser => {
            savedUser.password = ''
            const payload = {data:savedUser}
            const secretKey = 'your-secret-key';
             const token = jwt.sign(payload, secretKey);
             resolve({savedUser,token}) 
        }).catch(error => {
            reject(error) 
        })
    
      

    })
}


const loginHelper = (user) => {
    return new Promise (async(resolve,reject) => {
        let userData =await Manufacturer.findOne({email : user.email})
        if(userData){
            
            bcrypt.compare(user.password,userData.password).then((status) => {
                if(status){
                    const payload = {data:userData}
                    const secretKey = 'your-secret-key';
                    const token = jwt.sign(payload, secretKey);
                    userData.password = '',
                   
                    resolve({
                        status:true,
                        user:userData,
                        token: token
                    })
                }else{
                    reject({
                        status: false,
                        message : 'Wrong Password'
                    })
                }
            })
        }else{
            reject({
                status : false,
                message : 'No user found'
            })
        }
    
    })
}


const getTransportersHelper = () => {
    return new Promise ((resolve,reject) => {
        Transporter.find({},'-password').then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
   
}


export {
    manufacturerSignUp,loginHelper,getTransportersHelper
}