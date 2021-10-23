const express = require('express');
const ProductModel = require('../models/productModel');
const {parseMessageError} = require('../helpers/errorsHelper');
const { Op } = require("sequelize");

const errormessage = (res, err, msg="Some error occurred")=>{
    res.status(500).json({
        ok:false,
        message: parseMessageError(err) || msg
    });
}

const createProduct = async (req, res)=>{
    let body = req.body;

    let product = {
        name: body.name,
        price: body.price, 
        stock: body.stock,
        providerId: body.provider
    }
    
    try{
        const products = await ProductModel.create(product)
        if(products){
            res.json({
                ok:true,
                product: products
            });
        }
    } catch(err){
        res.status(500).json({
            ok:false,
            message: parseMessageError(err) || 'Some error occurred while creating the product'
        });
    }

};

const getAllProducts = async (req, res)=>{
    try {
        const productDB = await ProductModel.findAll();
        if(productDB){
            res.json({
                ok:true,
                products: productDB
            });
        }else{
            errormessage(res, err, msg='Some error occurred while consult the list of products')
        }
    } catch (err) {
        errormessage(res, err, msg='Some error occurred while consult the list of products')
    }
};

const getProductById =  async(req, res)=>{
    try {
        const id = req.params.id;
        const productsDb = await ProductModel.findByPk(id);
        
        if(productsDb){
            res.json({
                ok:true,
                product: productsDb
            })
        }
    } catch (err) {
        res.status(500).json({
            ok:false,
            message: parseMessageError(err) || msg
        });
    }
}

const searchProduct = async (req, res)=>{
    try {
        const text = req.params.search;
        const productsDb = await ProductModel.scope({method: ['search',text]}).findAll();
        
        if(productsDb){
            res.json({
                ok:true,
                products: productsDb
            })
        }
    } catch (err) {
        res.status(500).json({
            ok:false,
            message: parseMessageError(err) || msg
        });
    }
}

const updateProduct = async (req, res)=>{
    const idProduct = req.params.idProduct;
    const body = req.body;
    try {
        let product = {
            name: body.name,
            price: body.price, 
            stock: body.stock,
            providerId: body.provider
        }

        let productDb = await ProductModel.findOne( {where: { [Op.and]:[{id : idProduct}, { active : true}] } });
        if(productDb){
            await ProductModel.update(product, {where:{id : idProduct}} );
            productDb = await ProductModel.findOne( {where: { [Op.and]:[{id : idProduct}, { active : true}] } });
        }else{
            res.status(500).json({
                ok:false,
                message:'The product does not exist or is not active'
            });
        }

        if(productDb){
            res.json({
                ok:true,
                product:productDb
            })
        }
    } catch (err) {
        res.status(500).json({
            ok:false,
            message: parseMessageError(err) || msg
        });
    }
}

const desactiveProduct = async(req, res)=>{
    const idProduct = req.params.idProduct;
    try {
        const productDb = await ProductModel.findOne( {where: { [Op.and]:[{id : idProduct}, { active : true}] } });
        if(productDb){
            await ProductModel.update({active: false}, {where:{id : idProduct}} );
        }else{
            res.status(500).json({
                ok:false,
                message:'The product does not exist or is not active'
            });
        }

        if(productDb){
            res.json({
                ok:true,
                product:productDb
            })
        }
    } catch (err) {
        res.status(500).json({
            ok:false,
            message: parseMessageError(err) || msg
        });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    searchProduct,
    updateProduct,
    desactiveProduct
};