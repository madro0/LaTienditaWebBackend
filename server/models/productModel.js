const {Model, DataTypes, Op} = require('sequelize');
const sequelize = require('../config/database');
const ProviderModel = require('./providerModel');
const { v4 } =require('uuid');

class ProductModel extends Model {}

ProductModel.init({
    id:{
        type:DataTypes.UUID,
        allowNull: false,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4 
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 255]
        }
    },
    price:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        validate:{
            min:{
                args:[0],
                msg:"The price be not less than zero"
           }
        }
    },
    stock:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate:{
            min:{
                args:[0],
                msg:"The stock be not less than zero"
           }
        }
    },
    active:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
},{
    scopes:{
        search(text){
            return{
                where:{
                    // name: {[Op.like]:`%${text}%`}
                    [Op.and]:[
                        {name: {[Op.like]:`%${text}%`}},
                        {active:true}
                    ]
                }
            }
        }
    },
    defaultScope:{
        where:{
            active: true
        }
    },
    sequelize,
    modelName:"product"
});

ProductModel.belongsTo(ProviderModel);

module.exports = ProductModel;