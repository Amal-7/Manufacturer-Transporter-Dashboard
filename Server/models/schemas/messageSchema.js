import mongoose, { Schema, model } from "mongoose";

const messageSchema = new Schema({
    isFrom : { type: String ,required:true},
    content : {type : String ,required : true},
    createdAt: { type: Date, default: Date.now },
    orderId: { type: String ,required: true}

})


const Message = model('messages',messageSchema)

export default Message