const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use('/users', (req, res)=>{
    res.send("Hello fellow users");
})

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("Server is listening on port " + PORT);
})