import Message from "../schemas/messageSchema.js"
import Order from "../schemas/orderSchema.js"

const createOrder =(order) => {
    return new Promise((resolve,reject) => {
       const newMessage = new Order({
            sender : order.sender,
            recipient : order.recipient,
            orderDetails : order.orderDetails,          
       })

       newMessage.save().then((savedMessage)=>{
        resolve()
       }).catch(() => {
        reject()
       })
    })
}

const getOrders = (userId) => {
    return new Promise((resolve,reject) => {
        Order.find({'sender._id' : userId}).sort({createdAt:-1}).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject (err)
        })
    })
}

const getTransporterOrders = (userId) => {
    return new Promise((resolve,reject) => {
        Order.find({'recipient._id' : userId}).sort({createdAt:-1}).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject (err)
        })
    })
}


const createMessage = (data) => {
    return new Promise((resolve,reject) => {
        console.log(data,'dataaaaa')
        const newMessage = new Message({
            isFrom : data.isFrom,
            content: data.content,
            orderId : data.commonId
        })
        newMessage.save().then((res) => {
            resolve()
        }).catch(err => reject(err)) 
    })
}   

const getMessages = (orderId) => {
    return new Promise((resolve,reject) => {
        Message.find({orderId}).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

export {
    createOrder , getOrders,getTransporterOrders ,createMessage,getMessages
}