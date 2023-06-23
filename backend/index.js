const express = require("express");
const {connection} = require("./db");
const { userRouter } = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const { questionRouter } = require("./routes/question.route");
require("dotenv").config();

const app = express();

app.get("/", (req, res)=>{
    res.send("hello world")
})

app.use(express.json());
app.use(cookieParser())
app.use("/users", userRouter)
app.use("/question", questionRouter)

app.listen(process.env.PORT, async ()=>{
    try {
        await connection;
        console.log(`connection established with ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})