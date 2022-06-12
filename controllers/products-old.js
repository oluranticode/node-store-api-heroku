const Product = require('../models/product');

// ...........filter by name...............(?name=a)
    // const getAllProductsStatic = async (req, res) => {
    //     const search = "ag";
    //     //find all the document
    //     const products = await Product.find({ name: {$regex : search, $options: 'i'}})
    //     res.status(200).json({products, length: products.length})
    // }

    // ..............// Sort Method.................
    // const getAllProductsStatic = async (req, res) => {
    //     // const products = await Product.find({ })
    //     const products = await Product.find({ }).sort('-name price'); //sort by name and price
    //     res.status(200).json({products, length: products.length});
    // }

    // ..............// Select Method.................
    
     const getAllProductsStatic = async (req, res) => {
        // const products = await Product.find({ })
        const products = await Product.find({}).sort('-name price'); //select name and price
        res.status(200).json({products, length: products.length});
    }

    
    const getAllProducts =async (req, res) => {    
        const {featured, company, name, sort} = req.query;
        const queryObj = {}

// ...........filter by featured...............(?featured=)
        if(featured){
            queryObj.featured = featured === "true"? true : false
                }

// ...........filter by company...............(?company=)
                if(company){
                    queryObj.company = company;
                }

// ...........filter by name...............(?name=a)
                if(name){
                    queryObj.name =  {$regex : name, $options: 'i'};
                }
        //         console.log(queryObj);
        // const products = await Product.find(queryObj)

        // ..... sort........
        let result = Product.find(queryObj)
        if(sort){
           const sortList = sort.split(',').join(',');
           result = result.sort(sortList);
        }else {
            result = result.sort(sortList);
        }
        const products = await result
        res.status(200).json({products, length: products.length})
    }

    module.exports = {
        getAllProductsStatic, getAllProducts
    }