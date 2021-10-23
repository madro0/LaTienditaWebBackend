const express = require('express');
const { parseMessageError } = require('../helpers/errorsHelper');
const SalesModel = require('../models/salesModel');
const app = express();
const salesModel = require('../models/salesModel'); 
const SalesProductModel = require('../models/salesProductModel');
const { Sequelize } = require('sequelize');

app.post('/sales',async(req, res)=>{
    let body = req.body;
    let sale = {
        total:body.total,
        userId:body.user
    }
    const t = await SalesModel.sequelize.transaction();
    let saleDb;
    try {
        saleDb = await SalesModel.create(sale);
        // saleDb = await SalesModel.create(sale,{transaction:t});
        // await t.commit();   
        const shoppingListDb = await creatListSalesProduct(body.shoppingList, saleDb.id);
        if(shoppingListDb && saleDb){
            res.json({
                ok:true,
                sale:saleDb,
                shoppingList: shoppingListDb
            });
        }else{
            if(saleDb){
                await salesModel.destroy({where: { id : saleDb.id}});
            }
            return res.status(500).json({
                ok:false,
                message:  'some error ocurred while creating an new sales'
            })
        }
    } catch (err) {
        if(saleDb){
            await salesModel.destroy({where: { id : saleDb.id}});
        }
        // t.rollback()
        res.status(500).json({
            ok:false,
            message: err || 'some error ocurred while creating an new sales',
        })
    }

});

const creatListSalesProduct= async(shoppingList, idSale)=>{
    
    // row = JSON.parse(row);
    let row = shoppingList;
    // let row = [{amount:9,productId:"8979a336-86f1-44a2-81b8-d6a668696839"}, {amount:1,productId:"af3cecea-a0c1-4fca-9ef4-6dc7074d291b"}];
    
    // console.log( JSON.stringify(row) );
    // row.map((item)=>{
    //     console.log(item);
    // });

    for(let item in row){
        row[item]['saleId']=idSale;
    }

    // for(let item in row){
    //     for(let j in row[item]){
    //         console.log(j , row[item][j]);
    //     }
    // }
    // console.log(row)
    const a = {
        amount: 1,
        productId: "8979a336-86f1-44a2-81b8-d6a668696839",
        saleId:idSale
    }

    try {
        const saleDb = await SalesProductModel.bulkCreate(row);
        return saleDb;
    } catch (err) {
        return null;
    }
}
module.exports = app;