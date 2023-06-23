const express = require("express");
const {connection} = require("./db");
const cors=require("cors");
const { userRouter } = require("./routes/user.route");
const cookieParser = require("cookie-parser");
// const { questionRouter } = require("./routes/question.route");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", (req, res)=>{
    res.send("hello world")
})

app.use(express.json());
app.use(cookieParser())
app.use("/users", userRouter)
// app.use("/question", questionRouter)

app.post("/completion",async (req, res)=>{
    const options = {
        method: "POST",
        headers:{
            "Authorization": `Bearer ${process.env.API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            message: [{role: "user", content:"how are you"}],
            max_tokens:100
        })
    }
    try {
        fetch(`https://api.openai.com/v1/chat/completions`, options)
    } catch (error) {
        console.log(error)
    }
})

app.listen(process.env.PORT, async ()=>{
    try {
        await connection;
        console.log(`connection established with ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})