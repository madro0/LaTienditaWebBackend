const {Model, DataTypes, Op} = require('sequelize');
const sequelize = require('../config/database');
const ProductModel = require('./productModel');
const SalesModel = require('./salesModel');

class SalesProductModel extends Model {}

SalesProductModel.init({
    id:{
        type:DataTypes.UUID,
        allowNull: false,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4 
    },
    amount:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate:{
            min:{
                args:[0],
                msg:"The amount be not less than one"
           }
        }
    }
},{
    sequelize,
    modelName:'salesProduct'
});

SalesProductModel.belongsTo(ProductModel);
SalesProductModel.belongsTo(SalesModel);

module.exports = SalesProductModel;
