import { getMessages, getOrders ,getTransporterOrders} from "../models/helpers/messageHelper.js"

const orders = (req,res) =>  {
    getOrders(req.query._id).then((response) => {
        res.json(response)
    }).catch((err) => {
        res.json(err)
    })
}

const transporterOrder = (req,res) =>  {
    getTransporterOrders(req.query._id).then((response) => {
        res.json(response)
    }).catch((err) => {
        res.json(err)
    })
}

const messages = (req,res) => {
    getMessages(req.query.orderId).then((response) => {
        res.json(response)
    }).catch((err) => {
        res.json(err)
    })
}

export {
    orders,transporterOrder,messages
}