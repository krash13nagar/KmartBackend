const app=require("./app");

const dotenv=require("dotenv");
const cloudinary=require("cloudinary");
const connectDatabase=require("./config/database");


// Handling Uncaught Exceptions

process.on("uncaughtException", (err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    
    server.close(()=>{
        process.exit(1);
    })
})

// Config

dotenv.config();


// Connecting to database
connectDatabase();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

const server=app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
    // console.log(`server is working on http://localhost:${process.env.PORT}`)
});




// Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejections`);

    server.close(()=>{
        process.exit(1);
    })
});
