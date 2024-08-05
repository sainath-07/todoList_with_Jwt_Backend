const express = require('express');
const userRouter = require('./routes/userRouter');
const mongoose = require('mongoose')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors');
const todorouter = require('./routes/todoRouter');

const app = express()
const port = process.env.port || 5000;
mongoose.connect(process.env.mongodburl)
    .then(x => console.log('database connected'))
    .catch(x => console.log(x))

//Middlewares.
app.use(bodyParser.json())
app.use(express.json())
app.use(cors('*'))

app.use('/', userRouter)
app.use('/todos', todorouter)

app.get('/', (req, res) => {
    res.send('Home page')
})

app.listen(`${port}`, () => {
    console.log(`Sever is running at ${port}`)
})