const Product = require('../models/product');

    
    const getAllProductsSort =async (req, res) => {    
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

    module.exports = getAllProductsSort;