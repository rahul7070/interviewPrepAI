const express=require("express")
const cors=require("cors")
const connection=require('')
const { connection } = require("mongoose")
const app=express()
app.use(express.json())
app.use(cors())
const port=8080;


app.listen(port,()=>{
    // await connection;
    try {
        console.log("connected to port")
    } catch (error) {
        console.log(error)
    }
})