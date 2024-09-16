import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

// const DBCon=async()=>{
//     try{
//         mongoose.connect('')
//     }catch(error){

//     }
// }

mongoose.connect(process.env.DATABASE)
.then(() => {
    console.log('Database connected');
}).catch(err => {
    console.error('Database connection error:', err);
});

// export default DBCon