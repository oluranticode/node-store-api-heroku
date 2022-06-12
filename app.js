require('dotenv').config()
// async error
require('express-async-errors');
// import express
const express = require('express');
const app = express();
// import middlewares 
const notfoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
// import middleware
const connectDB = require('./db/connect');
// import router
const router = require('./routes/products');
const port = process.env.PORT || 5000;

app.use(express.json());

// route
app.get('/', (req, res) => {
    res.send('<h1> API STORE </h1><a href="/api/v1/products/"> products API </a>')
})

// products route
app.use('/api/v1/products/', router)

app.use(notfoundMiddleware);
app.use(errorMiddleware);

// creating port and connecting to db
const start = async() => {
    try{
        // conncet DB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`listening to port ${port}...`)
        })
    }catch(error){
    console.log(error)
    }
}

start(); 