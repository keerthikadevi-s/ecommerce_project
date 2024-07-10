const Product = require("../models/product");

async function getProduct(req, res){
    const products = await Product.find({});
    res.json(products);
}
async function addProduct(req, res){
    const body = req.body;
    await Product.create({
        productName: body.name,
        price: body.price,
        img: body.img
    })
    res.status(201).json({status: "Added new product"});
}

async function updateProduct(req, res){
    const body = req.body;
    const name = body.name;

    await Product.updateOne({productName: name}, {price: body.price, img: body.img});

}
async function deleteProduct(req, res){
    const body = req.body;
    await Product.findOneAndDelete({productName: body.name});
}

module.exports = {getProduct, addProduct, updateProduct, deleteProduct};