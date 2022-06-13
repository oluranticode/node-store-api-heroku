require('dotenv').config()
// async error
require('express-async-errors');
// import express
const express = require('express');
// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

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
    res.send('<h1> API STORE </h1><a href="/api/v1/products"> products API </a>')
})

app.set('trust proxy', 1);
  app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  );
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(xss()); 

// products route
app.use('/api/v1/products', router)

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