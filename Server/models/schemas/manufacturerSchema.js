import { Schema ,model} from "mongoose";


const manufacturerSchema = new Schema({
    fullName : String ,
    email : {
        type : String,
        required: true,
        unique: true
    },
    password : String,
    address : String,
    role : String
})

const Manufacturer = model('manufacturer' , manufacturerSchema)

export default Manufacturer