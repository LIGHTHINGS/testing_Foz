const Product = require('../Models/model.js');
const mongoose = require('mongoose');

const ProductController = {
    getAllProduct: async (req, res) => {
        // console.log(req)
        try {
            const allProduct = await Product.find();
    
            if (!allProduct) return res.status(404).send('Page not found');
    
            res.status(200).json(allProduct);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    },
    getProductById: async (req, res) => {
        const productId = req.params.id;
        if(!mongoose.isValidObjectId(productId)) return res.status(400).send('Invalid ID');

        const productFound = await Product.findById(productId);
        try {
            if (!productFound) return res.status(404).json({success: false, message: 'Product not found'});
    
                res.status(200).json(productFound)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    postNewProduct: async ( req, res) => {
        const newData = req.body;
    
        await Product.create(newData, (err, newProduct) => {
            try {
                if(!newProduct) return res.status(400).send('Product not created');
    
                res.status(200).json(newProduct);
            } catch (err) {
                console.log(err);
            }
        });
    },
    deleteProductById: async (req, res) => {
        const productId = req.params.id;
        if(!mongoose.isValidObjectId(productId)) return res.status(400).send('Invalid ID');
        const deletedProduct = await Product.findByIdAndRemove(productId).exec();
        try {
            if(!deletedProduct) return res.status(404).send('Product Not Found');

            res.redirect('/api/admin/products');

        } catch (error) {
            res.status(500).json({success:false, message: error});
        };
    }
};

module.exports = ProductController;