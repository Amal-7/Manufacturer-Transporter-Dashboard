import {Server} from 'socket.io'
import { createMessage, createOrder } from '../messageHelper.js';

let io ;

const transporterSockets = {}
const manufacturerSockets = {}

function initializeSocket (server) {
     io = new Server(server,{
        cors : {
          origin : 'http://localhost:1234',
          methods: ["GET", "POST"],
      
        }
      })

      io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('registerTransporter',(transporterId) => {
            transporterSockets[transporterId] = socket.id
        })

        socket.on('registerManufacturer',(manufacturerId) => {
            manufacturerSockets[manufacturerId] = socket.id
        })

        socket.on('submit order',(order ) => {
          
            const selectedTransporter = transporterSockets[order.message.selectedTransporterId] 
            const selectedManufacturer = manufacturerSockets[order.message.sender._id]
            createOrder(order?.message).then(() => {
                io.to(selectedManufacturer).emit('order processed')
                io.to(selectedTransporter).emit('newOrder',order)
            })
        })

        socket.on('join room',(commonId) => {
            socket.join(commonId)
        })

        socket.on('sendMessage' ,(message) => {
            
            createMessage(message).then(()=>{

            socket.to(message.commonId).emit('recieveMessage',message)

            }).catch((err) => {

            })
        })

      
        // Handle receiving messages from manufacturers
    
      
        // Handle disconnection
        socket.on('disconnect', () => {
          console.log('A user disconnected');
        });
      });
}

export {initializeSocket}  