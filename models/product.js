    const mongoose = require('mongoose');
    const productSchema = new mongoose.Schema({
        name:{
            type:String,
            required:[true, 'Product name is needed']
        },
        price:{
            type:Number,
            required:[true, 'Product Price is needed']
        },
        featured:{
            type:Boolean,
            default:false
        }, 
        rating:{
            type:Number,
            default:4.5
        },
        createdAt:{
            type:Date,
            default: Date.now()
        },
        company:{
            type:String,
            enum : {
                values: ['marcos', 'liddy', 'ikea', 'caressa', 'paystack'],
                message: '{VALUE} is not supported', 
            },
            // enum: ['HP', 'DELL', 'ACER', 'LENOVO']
        },

    })

    module.exports = mongoose.model('Product', productSchema);