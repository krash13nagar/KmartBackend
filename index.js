const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const dotenv=require("dotenv");
const cloudinary=require("cloudinary");
const connectDatabase=require("./config/database");
const cors = require("cors");
const errorMiddleware=require("./middleware/error");

//Config
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use(cors());


// Route Imports
const product =require("./routes/productRoute");
const user=require("./routes/userRoute");
const order=require("./routes/orderRoute");
const payment=require("./routes/paymentRoute");


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);
app.get('/',(req,res)=>{
    res.send('Hello World');
});

// Middleware for Errors
app.use(errorMiddleware);


// Handling Uncaught Exceptions

process.on("uncaughtException", (err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    
    server.close(()=>{
        process.exit(1);
    })
})

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

module.exports=app