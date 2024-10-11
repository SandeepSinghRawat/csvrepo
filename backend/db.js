const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://rawatsandeep:test123@cluster0.9qplw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const db = mongoose.connection;
db.on("error", () => {
  console.log("something ");
  
})

db.once("open", ()=> {
  console.log("database is running");
  
})
module.exports = db;
// const dburl = "mongodb+srv://rawatsandeep:test123@cluster0.9qplw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // const db = require("./db");
// const mongoose = require('mongoose');
// mongoose.connect(dburl).then(()=> {
//   console.log("db connected");
// }).catch((error)=> {
//   console.log("db error", error);
  
// });