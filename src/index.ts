import express from "express";
import connection from "./db/config";


const app  = express();

connection.sync().then(() =>{
    console.log("Database synced succesfully")
}).catch((error)=>{
    console.log({"Error": error})
})

app.listen(3000)