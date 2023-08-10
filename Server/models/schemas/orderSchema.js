import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema({
    sender : { type: mongoose.Schema.Types.Mixed ,required:true},
    orderDetails: { type: mongoose.Schema.Types.Mixed,required:true },
    createdAt: { type: Date, default: Date.now },
    recipient: { type: mongoose.Schema.Types.Mixed ,required: true}

})


const Order = model('orders',orderSchema)

export default Order