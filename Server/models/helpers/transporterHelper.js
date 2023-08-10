

import jwt from 'jsonwebtoken' ;
import bcrypt from 'bcrypt' ;
import Transporter from '../schemas/transporterSchema.js';


const signUpHelper = (user) => {
    return new Promise (async(resolve,reject) => {
        user.password = await bcrypt.hash(user.password,10)
        const newUser = new Transporter({
            fullName : user.fullName ,
            email : user.email,
            password : user.password,
            role : user.role
        })
    
       newUser.save().then((savedUser) => {
            savedUser.password = ''
            const payload = { data : savedUser}
            const secretKey = 'your-secret-key';
            const token = jwt.sign(payload, secretKey);
            resolve({savedUser,token})
        }).catch(error => {
            reject({error,status : 'Invalid datas'}) 
        })
     
    })
}

const loginHelperTransporter = (user) => {
    return new Promise(async(resolve,reject) => {
        const userData =await Transporter.findOne({email : user.email})
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
                        token : token
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


export {
    signUpHelper,loginHelperTransporter
}