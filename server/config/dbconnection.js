// import mongoose from "mongoose";


// mongoose.set('strictQuery' , false) ;

// const connectionDb = async ()=>{
// try {
//     const connection  =  await mongoose.connect(process.env.MONGO_URL)
//     if(connection){
//         console.log(`the server is connected to mongodb ${connection.host}`);
//     }


// } catch (error) {
//     console.log('the db is not connected');
//     throw error ;
// }

    
// }


// export default connectionDb 
import mongoose from "mongoose";


const connectDB = async () => {
    try {
     const    MONGO_URL="mongodb+srv://lms:rakshitlms@cluster0.fqdn7ez.mongodb.net/lms"
        const connectinstance = await mongoose.connect(MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

export default connectDB;









