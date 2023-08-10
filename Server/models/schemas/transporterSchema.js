import { Schema, model } from "mongoose";

const transporterSchema = new Schema({
    fullName : String ,
    email : {
        type : String,
        required: true,
        unique: true
    },
    password : String,
    role : String

})

const Transporter = model('transporter' ,transporterSchema)

export default Transporter