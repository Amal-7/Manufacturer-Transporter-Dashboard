import express from 'express';
import manufacturerRouter from './routes/manufacturer.js';
import transporterRouter from './routes/transporter.js';
import orderDetailsRouter from './routes/orderDetails.js'
import connection from './models/connection/connection.js';
import dotenv from 'dotenv'
import cors from "cors"
import http from 'http'
import { initializeSocket } from './models/helpers/socket/socket.js';
dotenv.config()



var app = express();

const server = http.createServer(app)
initializeSocket(server)


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// database connection
connection() 

// routes
app.use('/manufacturer',manufacturerRouter)
app.use('/transporter',transporterRouter)
app.use('/orderDetails',orderDetailsRouter)





// Port 
const PORT = process.env.PORT || 3000;
 server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: true,
    message: err.message,
    statusCode: statusCode,
  });
});








export default app




