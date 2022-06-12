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
    //  const getAllProductsStatic = async (req, res) => {
    //     // const products = await Product.find({ })
    //     const products = await Product.find({}).select('name price'); //select name and price
    //     res.status(200).json({products, length: products.length});
    // }

    // ..............// Select Method with limit................. 
    // const getAllProductsStatic = async (req, res) => {
    //     // const products = await Product.find({ })
    //     const products = await Product.find({}).select('name price').sort('name').limit(4).skip(5); 
    //     res.status(200).json({products, length: products.length});
    // }

       // ..............// Numeric Filter Method................. 
       const getAllProductsStatic = async (req, res) => {
        // const products = await Product.find({ })
        const products = await Product.find({price: {$gt:30}}).select('name price').sort('name'); 
        res.status(200).json({products, length: products.length});
    }

    
    const getAllProducts =async (req, res) => {    
        const {featured, company, name, sort, fields, numericFilter} = req.query;
        const queryObj = {}

// ...........sort filter by featured...............(?featured=)
        if(featured){
            queryObj.featured = featured === "true"? true : false
                }

// ...........sort filter by company...............(?company=)
                if(company){
                    queryObj.company = company;
                }

// ...........sort filter by name...............(?name=a)
                if(name){
                    queryObj.name =  {$regex : name, $options: 'i'};
                }
       
 // ...................Numeric Filter Method...................
    if(numericFilter){
       
        const operatorMap = {
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilter.replace(regEx,(match)=>`-${operatorMap[match]}-`);
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item)=>{
            const [field, operator, value ] = item.split('-')
            if(options.includes(field)){
                queryObj[field] = {[operator]:Number(value)}
            }
        })
    }

        let result = Product.find(queryObj)
        console.log(queryObj);

        // ..... sort Method........
       

          // ..... Select Method........
    if(fields){
        const fieldsList = fields.split(',').join(' ')
           result = result.select(fieldsList);
    }    

    // ...................Limit Method...................
    const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 10;
    const limit = Number(req.query.limit)

    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

        const products = await result
        res.status(200).json({products, length: products.length})
    }

    const createProduct = async (req, res) => {
       
        try{
            const product = await Product.create(req.body);
            res.status(200).json({product});
            if(!product){
                res.status(401).send('invalid request');
            }
        }
        catch(error){
            res.status(401).json({msg:error.message});
        }
        
    }

    module.exports = {
        getAllProductsStatic, getAllProducts, createProduct
    }