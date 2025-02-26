import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery',true);
    if (isConnected) return;

    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:process.env.MONGODB_DB,
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Connected to MongoDB");
        isConnected = true;

    }catch(e){
        console.log("Error connecting to database: ", e);
    }
}