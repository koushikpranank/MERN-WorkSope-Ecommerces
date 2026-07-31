const mongose=require("mongoose");
const DBconnection=async()=>{
    try {
        await mongose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection failed", err);
    }
}

module.exports=DBconnection;