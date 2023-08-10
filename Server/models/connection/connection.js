
import mongoose from 'mongoose';

const connection = async()=>{

  await mongoose.connect('mongodb://localhost:27017/dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected')) 
.catch((err) => console.log(err));  

}



export default connection; 