import express from "express";
import connection from "./db/config";
import petRouter from "./pet/pet.router";
import { json, urlencoded } from "body-parser";
import claimRouter from "./claim/claim.router";


const app  = express();
app.use(json())
app.use(urlencoded({extended:true}))

app.use('/api/pet',petRouter)
app.use('/api/claim',claimRouter)


connection.sync().then(() =>{
    console.log("Database synced succesfully")
}).catch((error)=>{
    console.log({"Error": error})
})

app.listen(3000,()=>{
    console.log('server running')
})