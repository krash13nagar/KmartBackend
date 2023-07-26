const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;

// const mongoose = require('mongoose');

// mongoose.set('strictQuery', false)
// const uri = process.env.MONGO_DB_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result) => {
//         console.log("Connected to db");
//         // console.log(result);
//     })
//     .catch((err) => {
//         console.log("Error in connecting Mongo Database");
//         console.log(err);
//     })

//     module.exports = connectDatabase;

