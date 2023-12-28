import mongoose from "mongoose";

const connectDB = () =>{
    mongoose.connect(process.env.DB_URL, {
        dbName:"lenslight_tr",
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log(err);
    });
}
export default connectDB;