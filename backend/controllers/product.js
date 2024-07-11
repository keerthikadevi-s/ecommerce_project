const Product = require("../models/product");

async function getProduct(req, res){
    const products = await Product.find({});
    res.json(products);
}
async function addProduct(req, res){
    const body = req.body;
    await Product.create({
        productName: body.productName,
        price: body.price,
        img: body.img
    })
    res.status(201).json({status: "Added new product"});
}

async function updateProduct(req, res){
    const body = req.body;
    const name = body.productName;

    await Product.updateOne({productName: name}, {price: body.price, img: body.img});

    res.status(200).json({status: "Updated product"});

}
async function deleteProduct(req, res){
    const body = req.body;
    await Product.findOneAndDelete({productName: body.productName});
    res.status(200).json({status: "Deleted product"});
}

module.exports = {getProduct, addProduct, updateProduct, deleteProduct};