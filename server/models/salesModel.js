const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const UserModel = require('./userModel');

class SalesModel extends Model {}

SalesModel.init({
    id:{
        type:DataTypes.UUID,
        allowNull: false,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4 
    },
    total:{
        type: DataTypes.DOUBLE,
        allowNull:false,
        validate:{
            min:{
                args:[0],
                msg:"The price be not less than zero"
           }
        }
    },
    active:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    sequelize,
    modelName: "sales"
});
SalesModel.belongsTo(UserModel);

module.exports = SalesModel;

