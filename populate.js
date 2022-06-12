require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProduct = require('./products.json');

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany()  //remove all the data, but this is optional
        await Product.create(jsonProduct) // pass in all the data nad create
        console.log('success')
        process.exit(0) // exit the process
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();